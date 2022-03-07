import MilestoneDetails from "../../components/milestone-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function Milestone() {
  const router = useRouter();
  const [milestone, setMilestone] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: milestone } = await supabase
      .from("milestones")
      .select("*")
      .eq("id", router.query.id)
      .single();
    setMilestone(milestone);

    const { data: owner } =
      milestone &&
      (await supabase
        .from("profiles")
        .select("*")
        .eq("id", milestone.user_id)
        .single());
    setOwner(owner);

    const { data: project } =
      milestone &&
      (await supabase
        .from("projects")
        .select("*")
        .eq("id", milestone.project_id)
        .single());
    setProject(project);
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
