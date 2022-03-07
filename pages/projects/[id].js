import ProjectDetails from "../../components/project-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";
import ReadAllRows from "../../components/read-all-rows";

export async function getStaticPaths() {
  const data = await supabase
    .from("projects")
    .select("*")
    .then((data) => data.data);

  const paths =
    data &&
    data.map((project) => ({
      params: { id: project.id.toString() }
    }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  // Get external data from the file system, API, DB, etc.
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", context.params.id)
    .single();

  const { data: owner } =
    project &&
    (await supabase
      .from("profiles")
      .select("*")
      .eq("id", project.user_id)
      .single());

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", context.params.id);
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { project, owner, tasks }
  };
}

function Project({ project, owner, tasks }) {
  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true; parallax: 60"
      >
        {project & owner && (
          <div>
            <ProjectDetails data={project} owner={owner}></ProjectDetails>
          </div>
        )}

        {tasks && (
          <div>
            <ReadAllRows data={tasks} title="Project tasks"></ReadAllRows>
          </div>
        )}

        {project && (
          <div>
            <Delete item={project} table="projects"></Delete>
          </div>
        )}
      </div>
    </div>
  );
}
export default Project;
