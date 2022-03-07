import MilestoneDetails from "../../components/milestone-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";

export async function getStaticPaths() {
  const { data: milestones } = await supabase.from("milestones").select("*");

  const paths = milestones.map((milestone) => ({
    params: { id: milestone.id.toString() }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  // Get external data from the file system, API, DB, etc.
  const { data: milestone } = await supabase
    .from("milestones")
    .select("*")
    .eq("id", context.params.id)
    .single();

  const { data: owner } =
    milestone &&
    (await supabase
      .from("profiles")
      .select("*")
      .eq("id", milestone.user_id)
      .single());

  const { data: project } =
    milestone &&
    (await supabase
      .from("projects")
      .select("*")
      .eq("id", milestone.project_id)
      .single());
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { milestone, owner, project }
  };
}

function Milestone({ milestone, owner, project }) {
  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true; parallax: 60"
      >
        {milestone & owner & project && (
          <div>
            <MilestoneDetails
              data={milestone}
              owner={owner}
              project={project}
            ></MilestoneDetails>
          </div>
        )}

        {milestone && (
          <div>
            <Delete item={milestone} table="milestones"></Delete>
          </div>
        )}
      </div>
    </div>
  );
}
export default Milestone;
