import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyProjects from "../../components/my-projects";
import Delete from "../../components/delete";
import ProjectDetails from "../../components/project-details";

function Projects() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [projects, setProjects] = useState(null);
  const [myProjects, setMyProjects] = useState(null);
  const [project, setProject] = useState(null);
  const [owner, setOwner] = useState(null);
  const [tasks, setTasks] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: projects } = await supabase.from("projects").select("*");
    setProjects(projects);

    const { data: myProjects } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id);
    setMyProjects(myProjects);

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
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="projects"></SearchAcrossProjects>
        </div>

        <div>
          {projects ? (
            <ReadAllRows
              data={projects}
              title="All Projects"
              setSelection={setProject}
            ></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {myProjects ? (
            <MyProjects data={myProjects}></MyProjects>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {project & owner ? (
            <ProjectDetails data={project} owner={owner}></ProjectDetails>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {tasks ? (
            <ReadAllRows
              data={tasks}
              title="Project tasks"
              setSelection={setProject}
            ></ReadAllRows>
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
export default Projects;
