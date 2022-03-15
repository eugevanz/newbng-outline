import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyProjects from "../../components/my-projects";
import Delete from "../../components/delete";
import ProjectDetails from "../../components/project-details";

export async function getStaticProps() {
  const { data: tasks } = await supabase.from("tasks").select("*");
  const { data: profiles } = await supabase.from("profiles").select("*");
  const { data: projects } = await supabase.from("projects").select("*");

  return {
    props: { tasks, profiles, projects },
    revalidate: 1 // In seconds
  };
}

function Projects(props) {
  const router = useRouter();
  const user = supabase.auth.user();
  const [project, setProject] = useState(null);

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
          {props.projects && (
            <ReadAllRows
              data={props.projects}
              title="All Projects"
              setSelection={setProject}
            ></ReadAllRows>
          )}
        </div>

        <div>
          {props.projects & user && (
            <MyProjects
              data={props.projects.filter((item) => item.user_id === user.id)}
            ></MyProjects>
          )}
        </div>

        <div>
          {project & props.profiles && (
            <ProjectDetails
              data={project}
              owner={props.profiles.find((item) => item.id === project.user_id)}
            ></ProjectDetails>
          )}
        </div>

        <div>
          {project & props.tasks && (
            <ReadAllRows
              data={props.tasks.filter(
                (item) => item.project_id === project.id
              )}
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
  );
}
export default Projects;
