import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyLogs from "../../components/my-logs";
import Delete from "../../components/delete";
import LogDetails from "../../components/log-details";

function Logs() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [logs, setLogs] = useState(null);
  const [myLogs, setMyLogs] = useState(null);
  const [log, setLog] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: logs } = await supabase.from("logs").select("*");
    setLogs(logs);

    const { data: myLogs } = await supabase
      .from("logs")
      .select("*")
      .eq("user_id", user.id);
    setMyLogs(myLogs);

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
      (await supabase.from("tasks").select("*").eq("id", log.task_id).single());
    setTask(task);
  }

  useEffect(() => !user && router.push("/"));

  useEffect(() => {
    try {
      getPageData();
    } catch (err) {
      alert(err.message);
    }
  });

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="logs"></SearchAcrossProjects>
        </div>

        <div>
          {logs ? (
            <ReadAllRows
              data={logs}
              title="All Logs"
              setSelection={setLog}
            ></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {myLogs ? (
            <MyLogs data={myLogs}></MyLogs>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {log & owner & task ? (
            <LogDetails data={log} owner={owner} task={task}></LogDetails>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {log ? (
            <Delete item={log} table="logs"></Delete>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Logs;
