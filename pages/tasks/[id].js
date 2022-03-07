import TaskDetails from "../../components/task-details";
import AddAttachment from "../../components/add-attachment";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";

export async function getStaticPaths() {
  const data = await supabase
    .from("tasks")
    .select("*")
    .then((data) => data.data);

  const paths = data.map((task) => ({ params: { id: task.id.toString() } }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  // Get external data from the file system, API, DB, etc.
  const { data: task } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", context.params.id)
    .single();

  const { data: owner } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", task.user_id)
    .single();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", task.project_id)
    .single();
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { task, owner, project }
  };
}

function Task({ task, owner, project }) {
  return (
    <div className="uk-width-expand@m uk-margin">
      <div
        className="uk-child-width-1-2@m"
        data-uk-grid="masonry: true; parallax: 60"
      >
        {(task & owner & project) && <div>
          <TaskDetails
            data={task}
            owner={owner}
            projectName={project.name}
          ></TaskDetails>
        </div>}

        <div>
          <AddAttachment></AddAttachment>
        </div>

        {task && <div>
          <Delete item={task} table="tasks"></Delete>
        </div>}
      </div>
    </div>
  );
}
export default Task;
