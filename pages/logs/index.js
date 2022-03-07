import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyLogs from "../../components/my-logs";

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const { data: logs } = await supabase.from("logs").select("*");
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { logs }
  };
}

function Logs({ logs }) {
  const router = useRouter();

  const user = supabase.auth.user();

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

        <div>
          <ReadAllRows data={logs} title="All Logs"></ReadAllRows>
        </div>

        <div>
          <MyLogs></MyLogs>
        </div>
      </div>
    </div>
  );
}
export default Logs;
