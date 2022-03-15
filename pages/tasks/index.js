import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyTasks from "../../components/my-tasks";
import Delete from "../../components/delete";
import TaskDetails from "../../components/task-details";
import AddAttachment from "../../components/add-attachment";

export async function getStaticProps() {
  const { data: tasks } = await supabase.from("tasks").select("*");
  const { data: profiles } = await supabase.from("profiles").select("*");
  const { data: projects } = await supabase.from("projects").select("*");

  return {
    props: { tasks, profiles, projects },
    revalidate: 1 // In seconds
  };
}

function Tasks(props) {
  const user = supabase.auth.user();
  const { push } = useRouter();
  const [task, setTask] = useState(null);

  useEffect(() => !user && push("/"));

  return (
    <div className="uk-width-expand@m">
      <div className="uk-child-width-1-2@m" data-uk-grid="masonry: true">
        <div>
          <SearchAcrossProjects title="tasks"></SearchAcrossProjects>
        </div>

        <div>
          {props.tasks && (
            <ReadAllRows
              data={props.tasks}
              title="All Tasks"
              setSelection={setTask}
            ></ReadAllRows>
          )}
        </div>

        <div>
          {props.tasks && (
            <MyTasks
              data={props.tasks.filter((item) => item.user_id === user.id)}
            ></MyTasks>
          )}
        </div>

        <div>
          {task & props.profiles & props.projects && (
            <TaskDetails
              data={task}
              owner={props.profiles.find((item) => item.id === task.user_id)}
              projectName={
                props.projects.find((item) => item.id === task.project_id)
                  .name || "No name"
              }
            ></TaskDetails>
          )}
        </div>

        <div>
          <AddAttachment></AddAttachment>
        </div>

        <div>{task && <Delete item={task} table="tasks"></Delete>}</div>
      </div>
    </div>
  );
}
export default Tasks;
