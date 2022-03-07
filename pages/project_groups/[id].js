import ProjectGroupDetails from "../../components/project-group-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";
import ReadAllRows from "../../components/read-all-rows";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function ProjectGroups() {
  const router = useRouter();
  const [project_group, setProject_group] = useState(null);
  const [projects, setProjects] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: project_group } = await supabase
      .from("project_groups")
      .select("*")
      .eq("id", router.query.id)
      .single();
    setProject_group(project_group);

    const { data: projects } =
      project_group &&
      (await supabase
        .from("projects")
        .select("*")
        .eq("project_group_id", project_group.id));
    setProjects(projects);
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
        {project_group && (
          <div>
            <ProjectGroupDetails data={project_group}></ProjectGroupDetails>
          </div>
        )}

        {projects && (
          <div>
            <ReadAllRows data={projects} title="User's projects"></ReadAllRows>
          </div>
        )}

        {project_group && (
          <div>
            <Delete item={project_group} table="project_groups"></Delete>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProjectGroups;
