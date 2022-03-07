import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyTasks from "../../components/my-tasks";
import Delete from "../../components/delete";
import TaskDetails from "../../components/task-details";
import AddAttachment from "../../components/add-attachment";

function Tasks() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [tasks, setTasks] = useState(null);
  const [myTasks, setMyTasks] = useState(null);
  const [task, setTask] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: tasks } = await supabase.from("tasks").select("*");
    setTasks(tasks);

    const { data: myTasks } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);
    setMyTasks(myTasks);

    const { data: owner } =
      task &&
      (await supabase
        .from("profiles")
        .select("*")
        .eq("id", task.user_id)
        .single());
    setOwner(owner);

    const { data: project } =
      task &&
      (await supabase
        .from("projects")
        .select("*")
        .eq("id", task.project_id)
        .single());
    setProject(project);
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
      <div className="uk-child-width-1-2@m" data-uk-grid="masonry: true">
        <div>
          <SearchAcrossProjects title="tasks"></SearchAcrossProjects>
        </div>

        <div>
          {tasks ? (
            <ReadAllRows
              data={tasks}
              title="All Tasks"
              setSelection={setTask}
            ></ReadAllRows>
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

        <div>
          {task & owner & project ? (
            <TaskDetails
              data={task}
              owner={owner}
              projectName={project.name}
            ></TaskDetails>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          <AddAttachment></AddAttachment>
        </div>

        <div>
          {task ? (
            <Delete item={task} table="tasks"></Delete>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Tasks;
