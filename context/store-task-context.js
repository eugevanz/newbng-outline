import { useState, useEffect, createContext,useContext } from "react";
import supabase from "./auth-context";

const TaskContext = createContext(null);

 function TaskProvider({ children }) {
  const user = supabase.auth.user();

  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [myTasks, setMyTasks] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(
    () => async () => {
      const { data: tasks } = await supabase.from("tasks").select("*");
      setTasks(tasks);

      const { data: myTasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id);
      setMyTasks(myTasks);
    },
    [user]
  );

  useEffect(
    () => async () => {
      const { data: owner } =
        task &&
        (await supabase
          .from("profiles")
          .select("*")
          .eq("id", task.user_id)
          .single());
      setOwner(owner);

      const { data: project } =
        task &&
        (await supabase
          .from("projects")
          .select("*")
          .eq("id", task.project_id)
          .single());
      setProject(project);
    },
    [task]
  );

  return (
    <TaskContext.Provider
      value={{
        task,
        setTask,
        tasks,
        setTasks,
        myTasks,
        setMyTasks,
        owner,
        setOwner,
        project,
        setProject
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;

export function useTaskStore() {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskStore must be used inside a `Provider`");
  return context;
}