import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyMilestones from "../../components/my-milestones";
import MilestoneDetails from "../../components/milestone-details";
import Delete from "../../components/delete";

export async function getStaticProps() {
  const { data: milestones } = await supabase.from("milestones").select("*");
  const { data: projects } = await supabase.from("projects").select("*");
  const { data: profiles } = await supabase.from("profiles").select("*");

  return {
    props: { milestones, projects, profiles },
    revalidate: 1 // In seconds
  };
}

function Milestones(props) {
  const router = useRouter();
  const user = supabase.auth.user();
  const [milestone, setMilestone] = useState(null);

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
          {props.milestones && (
            <ReadAllRows
              data={props.milestones}
              title="All Milestones"
              setSelection={setMilestone}
            ></ReadAllRows>
          )}
        </div>

        <div>
          {props.milestones & user && (
            <MyMilestones
              data={props.milestones.filter((item) => item.user_id === user.id)}
            ></MyMilestones>
          )}
        </div>

        <div>
          {milestone & props.profiles & props.projects && (
            <MilestoneDetails
              data={milestone}
              owner={props.profiles.find(
                (item) => item.id === milestone.user_id
              )}
              project={props.projects.find(
                (item) => item.id === milestone.project_id
              )}
            ></MilestoneDetails>
          )}
        </div>

        <div>
          {milestone && <Delete item={milestone} table="milestones"></Delete>}
        </div>
      </div>
    </div>
  );
}
export default Milestones;
