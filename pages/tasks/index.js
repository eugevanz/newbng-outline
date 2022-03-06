import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyTasks from "../../components/my-tasks";

function Tasks() {
  const router = useRouter();
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

  return (
    user && (
      <div className="uk-width-expand@m">
        <div
          className="uk-child-width-1-2@m"
          data-uk-grid="masonry: true; parallax: 60"
        >
          <div>
            <SearchAcrossProjects title="tasks"></SearchAcrossProjects>
          </div>

          <div>
            <ReadAllRows table="tasks" title="All Tasks"></ReadAllRows>
          </div>

          <div>
            <MyTasks></MyTasks>
          </div>
        </div>
      </div>
    )
  );
}
export default Tasks;
