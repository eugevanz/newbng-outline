import LogDetails from "../../components/log-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Log() {
  const router = useRouter();
  const [log, setLog] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: log } = await supabase
      .from("logs")
      .select("*")
      .eq("id", router.query.id)
      .single();
    setLog(log);

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
        data-uk-grid="masonry: true; parallax: 60"
      >
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
export default Log;
