import ProjectGroupDetails from "../../components/project-group-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";
import ReadAllRows from "../../components/read-all-rows";

export async function getStaticPaths() {
  const { data: project_groups } = await supabase
    .from("project_groups")
    .select("*");

  const paths = project_groups.map((project_group) => ({
    params: { id: project_group.id.toString() }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  // Get external data from the file system, API, DB, etc.
  const { data: project_group } = await supabase
    .from("project_groups")
    .select("*")
    .eq("id", context.params.id)
    .single();

  const { data: projects } =
    project_group &&
    (await supabase
      .from("projects")
      .select("*")
      .eq("project_group_id", project_group.id));
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { project_group, projects }
  };
}

function ProjectGroups({ project_group, projects }) {
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
