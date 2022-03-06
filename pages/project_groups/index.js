import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyProjectGroups from "../../components/my-project-groups";

function ProjectGroups() {
  const router = useRouter();

  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

  return (
    <div className="uk-width-expand@m">
      {user && (
        <div
          className="uk-child-width-1-2@m js-filter"
          data-uk-grid="masonry: true; parallax: 60"
        >
          <div>
            <SearchAcrossProjects title="project_groups"></SearchAcrossProjects>
          </div>

          <div>
            <ReadAllRows
              table="project_groups"
              title="All Project Groups"
            ></ReadAllRows>
          </div>

          <div>
            <MyProjectGroups></MyProjectGroups>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProjectGroups;
