import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import useStore from "../../context/store-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyMilestones from "../../components/my-milestones";
import MilestoneDetails from "../../components/milestone-details";
import Delete from "../../components/delete";

function Milestones() {
  const {
    milestones,
    setMilestone,
    myMilestones,
    milestone,
    owner,
    project
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
