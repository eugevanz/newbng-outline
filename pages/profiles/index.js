import { useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";

function Profiles() {
  const { user } = Auth.useUser();
  const [profiles, setProfiles] = useState(null);

  useEffect(
    () =>
      user &&
      supabase
        .from("profiles")
        .select("*")
        .then((data) => setProfiles(data.data)),
    [user]
  );

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="profiles"></SearchAcrossProjects>
        </div>

        <div>
          {profiles && (
            <ReadAllRows
              data={profiles}
              title="All Profiles"
              table="profiles"
            ></ReadAllRows>
          )}
        </div>
      </div>
    </div>
  );
}
export default Profiles;
