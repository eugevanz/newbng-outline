import { useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";

function ProjectGroups(props) {
  const { user } = Auth.useUser();
  const [groups, setGroups] = useState(null);

  useEffect(
    () =>
      user &&
      supabase
        .from("project_groups")
        .select("*")
        .then((data) => setGroups(data.data)),
    [user]
  );

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="project_groups"></SearchAcrossProjects>
        </div>

        <div>
          {groups && (
            <ReadAllRows
              data={groups}
              title="All Project Groups"
              table="project_groups"
            ></ReadAllRows>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProjectGroups;
