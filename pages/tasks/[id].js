import TaskDetails from "../../components/task-details";
import AddAttachment from "../../components/add-attachment";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Task() {
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);

  async function getPageData(context) {
    // Get external data from the file system, API, DB, etc.
    const { data: task } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", router.query.id)
      .single();
    setTask(task);

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

  useEffect(() => {
    try {
      getPageData();
    } catch (err) {
      alert(err.message);
    }
  });

  return (
    <div className="uk-width-expand@m uk-margin">
      <div
        className="uk-child-width-1-2@m"
        data-uk-grid="masonry: true; parallax: 60"
      >
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
export default Task;
