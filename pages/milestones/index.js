import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyMilestones from "../../components/my-milestones";

function Milestones() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [milestones, setMilestones] = useState(null);
  const [myMilestones, setMyMilestones] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: milestones } = await supabase.from("milestones").select("*");

    const { data: myMilestones } = await supabase
      .from("milestones")
      .select("*")
      .eq("user_id", user.id);

    setMilestones(milestones);
    setMyMilestones(myMilestones);
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
        data-uk-grid="masonry: true; parallax: 60"
      >
        <div>
          <SearchAcrossProjects title="milestones"></SearchAcrossProjects>
        </div>

        <div>
          {milestones ? (
            <ReadAllRows data={milestones} title="All Milestones"></ReadAllRows>
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
      </div>
    </div>
  );
}
export default Milestones;
