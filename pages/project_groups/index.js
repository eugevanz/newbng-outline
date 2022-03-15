import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import ProjectGroupDetails from "../../components/project-group-details";
import Delete from "../../components/delete";

export async function getStaticProps() {
  const { data: project_groups } = await supabase
    .from("project_groups")
    .select("*");
  const { data: projects } = await supabase.from("projects").select("*");

  return {
    props: { project_groups, projects },
    revalidate: 1 // In seconds
  };
}

function ProjectGroups(props) {
  const router = useRouter();
  const user = supabase.auth.user();
  const [project_group, setProject_group] = useState(null);

  useEffect(() => !user && router.push("/"));

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="project_groups"></SearchAcrossProjects>
        </div>

        <div>
          {props.project_groups && (
            <ReadAllRows
              data={props.project_groups}
              title="All Project Groups"
              setSelection={setProject_group}
            ></ReadAllRows>
          )}
        </div>

        <div>
          {project_group && (
            <ProjectGroupDetails data={project_group}></ProjectGroupDetails>
          )}
        </div>

        <div>
          {project_group & props.projects && (
            <ReadAllRows
              data={props.projects.filter(
                (item) => item.project_group_id === project_group.id
              )}
              title="User's projects"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {project_group && (
            <Delete item={project_group} table="project_groups"></Delete>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProjectGroups;
