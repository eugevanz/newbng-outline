import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import useStore from "../../context/store-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import ProjectGroupDetails from "../../components/project-group-details";
import MyProjectGroups from "../../components/my-project-groups";
import Delete from "../../components/delete";

function ProjectGroups() {
  const {
    project_groups,
    setProject_group,
    myProject_groups,
    project_group,
    projects
  } = useStore();
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
          {myProject_groups ? (
            <MyProjectGroups data={myProject_groups}></MyProjectGroups>
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
            <ReadAllRows data={projects} title="User's projects"></ReadAllRows>
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
  );
}
export default ProjectGroups;
