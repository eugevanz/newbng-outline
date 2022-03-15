import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyLogs from "../../components/my-logs";
import Delete from "../../components/delete";
import LogDetails from "../../components/log-details";

export async function getStaticProps() {
  const { data: logs } = await supabase.from("logs").select("*");
  const { data: tasks } = await supabase.from("tasks").select("*");
  const { data: profiles } = await supabase.from("profiles").select("*");

  return {
    props: { logs, tasks, profiles },
    revalidate: 1 // In seconds
  };
}

function Logs(props) {
  const router = useRouter();
  const user = supabase.auth.user();
  const [log, setLog] = useState(null);

  useEffect(() => !user && router.push("/"));

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
          {props.logs && (
            <ReadAllRows
              data={props.logs}
              title="All Logs"
              setSelection={setLog}
            ></ReadAllRows>
          )}
        </div>

        <div>
          {props.logs & user && (
            <MyLogs
              data={props.logs.filter((item) => item.user_id === user.id)}
            ></MyLogs>
          )}
        </div>

        <div>
          {log & props.profiles & props.tasks && (
            <LogDetails
              data={log}
              owner={props.profiles.find((item) => item.id === log.user_id)}
              task={props.tasks.find((item) => item.id === log.task_id)}
            ></LogDetails>
          )}
        </div>

        <div>{log && <Delete item={log} table="logs"></Delete>}</div>
      </div>
    </div>
  );
}
export default Logs;
