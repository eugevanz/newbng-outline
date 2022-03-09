import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyTasks from "../../components/my-tasks";
import Delete from "../../components/delete";
import TaskDetails from "../../components/task-details";
import AddAttachment from "../../components/add-attachment";
import TaskProvider from "../../context/store-task-context";

function Tasks() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [myTasks, setMyTasks] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(
    () => async () => {
      const { data: tasks } = await supabase.from("tasks").select("*");
      setTasks(tasks);

      const { data: myTasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id);
      setMyTasks(myTasks);
    },
    [user]
  );

  useEffect(
    () => async () => {
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
    },
    [task]
  );

  useEffect(() => !user && router.push("/"));

  return (
    <TaskProvider>
      <div className="uk-width-expand@m">
        <div className="uk-child-width-1-2@m" data-uk-grid="masonry: true">
          <div>
            <SearchAcrossProjects title="tasks"></SearchAcrossProjects>
          </div>

          <div>
            {tasks && (
              <ReadAllRows
                data={tasks}
                title="All Tasks"
                setSelection={setTask}
              ></ReadAllRows>
            )}
          </div>

          <div>
            {myTasks && (
              <MyTasks data={myTasks}></MyTasks>
            )}
          </div>

          <div>
            {task & owner & project && (
              <TaskDetails
                data={task}
                owner={owner}
                projectName={project.name}
              ></TaskDetails>
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
    </TaskProvider>
  );
}
export default Tasks;
