import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import useStore from "../../context/store-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyLogs from "../../components/my-logs";
import Delete from "../../components/delete";
import LogDetails from "../../components/log-details";

function Logs() {
  const { logs, setLog, myLogs, log, owner, task } = useStore();
  const router = useRouter();
  const user = supabase.auth.user();

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
