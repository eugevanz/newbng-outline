import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyLogs from "../../components/my-logs";

const user = supabase.auth.user();

export async function getServerSideProps() {
  // Get external data from the file system, API, DB, etc.
  const { data: logs } = await supabase.from("logs").select("*");

  const { data: myLogs } = await supabase
    .from("logs")
    .select("*")
    .eq("user_id", user.id);
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { logs, myLogs }
  };
}

function Logs({ logs, myLogs }) {
  const router = useRouter();

  useEffect(() => !user && router.push("/"));

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true; parallax: 60"
      >
        <div>
          <SearchAcrossProjects title="logs"></SearchAcrossProjects>
        </div>

        {logs && (
          <div>
            <ReadAllRows data={logs} title="All Logs"></ReadAllRows>
          </div>
        )}

        <div>
          <MyLogs data={myLogs}></MyLogs>
        </div>
      </div>
    </div>
  );
}
export default Logs;
