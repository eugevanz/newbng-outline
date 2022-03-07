import ProjectDetails from "../../components/project-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";
import ReadAllRows from "../../components/read-all-rows";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Project() {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [owner, setOwner] = useState(null);
  const [tasks, setTasks] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: project } = await supabase
      .from("projects")
      .select("*")
      .eq("id", router.query.id)
      .single();
    setProject(project);

    const { data: owner } =
      project &&
      (await supabase
        .from("profiles")
        .select("*")
        .eq("id", project.user_id)
        .single());
    setOwner(owner);

    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", router.query.id);
    setTasks(tasks);
  }

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
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true; parallax: 60"
      >
        <div>
          {project & owner ? (
            <ProjectDetails data={project} owner={owner}></ProjectDetails>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {tasks ? (
            <ReadAllRows data={tasks} title="Project tasks"></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {project ? (
            <Delete item={project} table="projects"></Delete>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Project;
