import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyMilestones from "../../components/my-milestones";
import MilestoneDetails from "../../components/milestone-details";
import Delete from "../../components/delete";

function Milestones() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [milestones, setMilestones] = useState(null);
  const [myMilestones, setMyMilestones] = useState(null);
  const [milestone, setMilestone] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: milestones } = await supabase.from("milestones").select("*");
    setMilestones(milestones);

    const { data: myMilestones } = await supabase
      .from("milestones")
      .select("*")
      .eq("user_id", user.id);
    setMyMilestones(myMilestones);

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

  useEffect(() => !user && router.push("/"));

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
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="milestones"></SearchAcrossProjects>
        </div>

        <div>
          {milestones ? (
            <ReadAllRows
              data={milestones}
              title="All Milestones"
              setSelection={setMilestone}
            ></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {myMilestones ? (
            <MyMilestones data={myMilestones}></MyMilestones>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {milestone & owner & project ? (
            <MilestoneDetails
              data={milestone}
              owner={owner}
              project={project}
            ></MilestoneDetails>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {milestone ? (
            <Delete item={milestone} table="milestones"></Delete>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Milestones;
