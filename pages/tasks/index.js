import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyTasks from "../../components/my-tasks";

function Tasks() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [tasks, setTasks] = useState(null);
  const [myTasks, setMyTasks] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: tasks } = await supabase.from("tasks").select("*");

    const { data: myTasks } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);

    setTasks(tasks);
    setMyTasks(myTasks);
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
        className="uk-child-width-1-2@m"
        data-uk-grid="masonry: true; parallax: 60"
      >
        <div>
          <SearchAcrossProjects title="tasks"></SearchAcrossProjects>
        </div>

        <div>
          {tasks ? (
            <ReadAllRows data={tasks} title="All Tasks"></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {myTasks ? (
            <MyTasks data={myTasks}></MyTasks>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Tasks;
