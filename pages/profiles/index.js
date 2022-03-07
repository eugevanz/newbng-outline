import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";

function Profiles() {
  const router = useRouter();
  const [profiles, setProfiles] = useState(null);

  const user = supabase.auth.user();

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: profiles } = await supabase.from("profiles").select("*");
    setProfiles(profiles);
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
          <SearchAcrossProjects title="profiles"></SearchAcrossProjects>
        </div>

        <div>
          {profiles ? (
            <ReadAllRows data={profiles} title="All Profiles"></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Profiles;
