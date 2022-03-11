import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyLogs from "../../components/my-logs";
import Delete from "../../components/delete";
import LogDetails from "../../components/log-details";
import LogProvider from "../../context/store-log-context";

function Logs() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [log, setLog] = useState(null);
  const [logs, setLogs] = useState(null);
  const [myLogs, setMyLogs] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch("/api/logs").then((data) => setLogs(data));
    fetch(`/api/my-stuff/logs/${user.id}`).then((data) => setMyLogs(data));
  }, [user]);

  useEffect(() => {
    log &&
      fetch(`/api/selected/log/${log.user_id}/${log.task_id}`).then((data) => {
        setOwner(data.owner);
        setTask(data.task);
      });
  }, [log]);

  useEffect(() => !user && router.push("/"));

  return (
    <LogProvider>
      <div className="uk-width-expand@m">
        <div
          className="uk-child-width-1-2@m js-filter"
          data-uk-grid="masonry: true"
        >
          <div>
            <SearchAcrossProjects title="logs"></SearchAcrossProjects>
          </div>

          <div>
            {logs && (
              <ReadAllRows
                data={logs}
                title="All Logs"
                setSelection={setLog}
              ></ReadAllRows>
            )}
          </div>

          <div>{myLogs && <MyLogs data={myLogs}></MyLogs>}</div>

          <div>
            {log & owner & task && (
              <LogDetails data={log} owner={owner} task={task}></LogDetails>
            )}
          </div>

          <div>{log && <Delete item={log} table="logs"></Delete>}</div>
        </div>
      </div>
    </LogProvider>
  );
}
export default Logs;
