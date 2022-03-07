import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyTasks from "../../components/my-tasks";

const user = supabase.auth.user();

export async function getServerSideProps() {
  // Get external data from the file system, API, DB, etc.
  const { data: tasks } = await supabase.from("tasks").select("*");

  const { data: myTasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id);
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { tasks, myTasks }
  };
}

function Tasks({ tasks }) {
  const router = useRouter();

  useEffect(() => !user && router.push("/"));

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m"
        data-uk-grid="masonry: true; parallax: 60"
      >
        <div>
          <SearchAcrossProjects title="tasks"></SearchAcrossProjects>
        </div>

        {tasks && (
          <div>
            <ReadAllRows data={tasks} title="All Tasks"></ReadAllRows>
          </div>
        )}

        <div>
          <MyTasks></MyTasks>
        </div>
      </div>
    </div>
  );
}
export default Tasks;
