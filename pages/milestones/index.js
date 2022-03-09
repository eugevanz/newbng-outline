import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyMilestones from "../../components/my-milestones";
import MilestoneDetails from "../../components/milestone-details";
import Delete from "../../components/delete";
import MilestoneProvider from "../../context/store-milestone-context";

function Milestones() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [milestone, setMilestone] = useState(null);
  const [milestones, setMilestones] = useState(null);
  const [myMilestones, setMyMilestones] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(
    () => async () => {
      const { data: milestones } = await supabase
        .from("milestones")
        .select("*");
      setMilestones(milestones);

      const { data: myMilestones } = await supabase
        .from("milestones")
        .select("*")
        .eq("user_id", user.id);
      setMyMilestones(myMilestones);
    },
    [user]
  );

  useEffect(
    () => async () => {
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
    },
    [milestone]
  );

  useEffect(() => !user && router.push("/"));

  return (
    <MilestoneProvider>
      <div className="uk-width-expand@m">
        <div
          className="uk-child-width-1-2@m js-filter"
          data-uk-grid="masonry: true"
        >
          <div>
            <SearchAcrossProjects title="milestones"></SearchAcrossProjects>
          </div>

          <div>
            {milestones && (
              <ReadAllRows
                data={milestones}
                title="All Milestones"
                setSelection={setMilestone}
              ></ReadAllRows>
            )}
          </div>

          <div>
            {myMilestones && (
              <MyMilestones data={myMilestones}></MyMilestones>
            )}
          </div>

          <div>
            {milestone & owner & project && (
              <MilestoneDetails
                data={milestone}
                owner={owner}
                project={project}
              ></MilestoneDetails>
            )}
          </div>

          <div>
            {milestone && (
              <Delete item={milestone} table="milestones"></Delete>
            )}
          </div>
        </div>
      </div>
    </MilestoneProvider>
  );
}
export default Milestones;
