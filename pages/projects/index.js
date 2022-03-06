import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyProjects from "../../components/my-projects";

function Projects() {
  const router = useRouter();
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

  return (
    user && (
      <div className="uk-width-expand@m">
        <div
          className="uk-child-width-1-2@m js-filter"
          data-uk-grid="masonry: true; parallax: 60"
        >
          <div>
            <SearchAcrossProjects title="projects"></SearchAcrossProjects>
          </div>

          <div>
            <ReadAllRows table="projects" title="All Projects"></ReadAllRows>
          </div>

          <div>
            <MyProjects></MyProjects>
          </div>
        </div>
      </div>
    )
  );
}
export default Projects;
