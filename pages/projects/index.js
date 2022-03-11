import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyProjects from "../../components/my-projects";
import Delete from "../../components/delete";
import ProjectDetails from "../../components/project-details";
import ProjectProvider from "../../context/store-project-context";

function Projects() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState(null);
  const [myProjects, setMyProjects] = useState(null);
  const [owner, setOwner] = useState(null);
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    fetch("/api/projects").then((data) => setProjects(data));
    fetch(`/api/my-stuff/projects/${user.id}`).then((data) =>
      setMyProjects(data)
    );
  }, [user]);

  useEffect(() => {
    project &&
      fetch(`/api/selected/project/${project.user_id}/${project.id}`).then(
        (data) => {
          setOwner(data.owner);
          setTasks(data.tasks);
        }
      );
  }, [project]);

  useEffect(() => !user && router.push("/"));

  return (
    <ProjectProvider>
      <div className="uk-width-expand@m">
        <div
          className="uk-child-width-1-2@m js-filter"
          data-uk-grid="masonry: true"
        >
          <div>
            <SearchAcrossProjects title="projects"></SearchAcrossProjects>
          </div>

          <div>
            {projects && (
              <ReadAllRows
                data={projects}
                title="All Projects"
                setSelection={setProject}
              ></ReadAllRows>
            )}
          </div>

          <div>{myProjects && <MyProjects data={myProjects}></MyProjects>}</div>

          <div>
            {project & owner && (
              <ProjectDetails data={project} owner={owner}></ProjectDetails>
            )}
          </div>

          <div>
            {tasks && (
              <ReadAllRows
                data={tasks}
                title="Project tasks"
                setSelection={setProject}
              ></ReadAllRows>
            )}
          </div>

          <div>
            {project && <Delete item={project} table="projects"></Delete>}
          </div>
        </div>
      </div>
    </ProjectProvider>
  );
}
export default Projects;
