import { useState, useEffect, createContext, useContext } from "react";
import supabase from "./auth-context";

const LogContext = createContext(null);

 function LogProvider({ children }) {
  const user = supabase.auth.user();

  const [log, setLog] = useState(null);
  const [logs, setLogs] = useState(null);
  const [myLogs, setMyLogs] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);

  useEffect(
    () => async () => {
      const { data: logs } = await supabase.from("logs").select("*");
      setLogs(logs);

      const { data: myLogs } = await supabase
        .from("logs")
        .select("*")
        .eq("user_id", user.id);
      setMyLogs(myLogs);
    },
    [user]
  );

  useEffect(
    () => async () => {
      const { data: owner } =
        log &&
        (await supabase
          .from("profiles")
          .select("*")
          .eq("id", log.user_id)
          .single());
      setOwner(owner);

      const { data: task } =
        log &&
        (await supabase
          .from("tasks")
          .select("*")
          .eq("id", log.task_id)
          .single());
      setTask(task);
    },
    [log]
  );

  return (
    <LogContext.Provider
      value={{
        log,
        setLog,
        logs,
        setLogs,
        myLogs,
        setMyLogs,
        owner,
        setOwner,
        task,
        setTask
      }}
    >
      {children}
    </LogContext.Provider>
  );
}

export default LogProvider;

export function useLogStore() {
  const context = useContext(LogContext);
  if (!context) throw new Error("useLogStore must be used inside a `Provider`");
  return context;
}