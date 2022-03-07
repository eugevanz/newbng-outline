import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyLogs from "../../components/my-logs";

function Logs() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [logs, setLogs] = useState(null);
  const [myLogs, setMyLogs] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: logs } = await supabase.from("logs").select("*");
    setLogs(logs);

    const { data: myLogs } = await supabase
      .from("logs")
      .select("*")
      .eq("user_id", user.id);
    setMyLogs(myLogs);
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
        data-uk-grid="masonry: true; parallax: 60"
      >
        <div>
          <SearchAcrossProjects title="logs"></SearchAcrossProjects>
        </div>

        <div>
          {logs ? (
            <ReadAllRows data={logs} title="All Logs"></ReadAllRows>
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
      </div>
    </div>
  );
}
export default Logs;
