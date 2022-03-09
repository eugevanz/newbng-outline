import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import ProjectGroupDetails from "../../components/project-group-details";
import Delete from "../../components/delete";
import ProjectGroupProvider from "../../context/store-group-context";

function ProjectGroups() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [project_group, setProject_group] = useState(null);
  const [project_groups, setProject_groups] = useState(null);
  const [projects, setProjects] = useState(null);

  useEffect(
    () => async () => {
      const { data: project_groups } = await supabase
        .from("project_groups")
        .select("*");
      setProject_groups(project_groups);
    },
    []
  );

  useEffect(
    () => async () => {
      const { data: projects } =
        project_group &&
        (await supabase
          .from("projects")
          .select("*")
          .eq("project_group_id", project_group.id));
      setProjects(projects);
    },
    [project_group]
  );

  useEffect(() => !user && router.push("/"));

  return (
    <ProjectGroupProvider>
      <div className="uk-width-expand@m">
        <div
          className="uk-child-width-1-2@m js-filter"
          data-uk-grid="masonry: true"
        >
          <div>
            <SearchAcrossProjects title="project_groups"></SearchAcrossProjects>
          </div>

          <div>
            {project_groups ? (
              <ReadAllRows
                data={project_groups}
                title="All Project Groups"
                setSelection={setProject_group}
              ></ReadAllRows>
            ) : (
              <div data-uk-spinner></div>
            )}
          </div>

          <div>
            {project_group ? (
              <ProjectGroupDetails data={project_group}></ProjectGroupDetails>
            ) : (
              <div data-uk-spinner></div>
            )}
          </div>

          <div>
            {projects ? (
              <ReadAllRows
                data={projects}
                title="User's projects"
              ></ReadAllRows>
            ) : (
              <div data-uk-spinner></div>
            )}
          </div>

          <div>
            {project_group ? (
              <Delete item={project_group} table="project_groups"></Delete>
            ) : (
              <div data-uk-spinner></div>
            )}
          </div>
        </div>
      </div>
    </ProjectGroupProvider>
  );
}
export default ProjectGroups;
