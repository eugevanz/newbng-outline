import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import useProjectStore from "../../context/store-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyProjects from "../../components/my-projects";
import Delete from "../../components/delete";
import ProjectDetails from "../../components/project-details";

function Projects() {
  const {
    projects,
    setProject,
    myProjects,
    project,
    owner,
    tasks
  } = useProjectStore();
  const router = useRouter();
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

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
