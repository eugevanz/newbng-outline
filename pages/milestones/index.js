import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyMilestones from "../../components/my-milestones";

const user = supabase.auth.user();

export async function getServerSideProps() {
  // Get external data from the file system, API, DB, etc.
  const { data: milestones } = await supabase.from("milestones").select("*");

  const { data: myMilestones } = await supabase
    .from("milestones")
    .select("*")
    .eq("user_id", user.id);
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { milestones, myMilestones }
  };
}

function Milestones({ milestones, myMilestones }) {
  const router = useRouter();

  useEffect(() => !user && router.push("/"));

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true; parallax: 60"
      >
        <div>
          <SearchAcrossProjects title="milestones"></SearchAcrossProjects>
        </div>

        {milestones && (
          <div>
            <ReadAllRows data={milestones} title="All Milestones"></ReadAllRows>
          </div>
        )}

        <div>
          <MyMilestones data={myMilestones}></MyMilestones>
        </div>
      </div>
    </div>
  );
}
export default Milestones;
