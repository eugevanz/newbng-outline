import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import useTaskStore from "../../context/store-task-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyTasks from "../../components/my-tasks";
import Delete from "../../components/delete";
import TaskDetails from "../../components/task-details";
import AddAttachment from "../../components/add-attachment";

function Tasks() {
  const { tasks, setTask, myTasks, task, owner, project } = useTaskStore();
  const router = useRouter();
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

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
