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
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [myTasks, setMyTasks] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch("/api/tasks").then((data) => setTasks(data));
    fetch(`/api/my-stuff/tasks/${user.id}`).then((data) => setMyTasks(data));
  }, [user]);

  useEffect(() => {
    task &&
      fetch(`/api/selected/task/${task.user_id}/${task.project_id}`).then(
        (data) => {
          setOwner(data.owner);
          setProject(data.project);
        }
      );
  }, [task]);

  useEffect(() => !user && router.push("/"));

  return (
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

        <div>{myTasks && <MyTasks data={myTasks}></MyTasks>}</div>

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
  );
}
export default Tasks;
