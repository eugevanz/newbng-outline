import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyProjectGroups from "../../components/my-project-groups";

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const { data: project_groups } = await supabase
    .from("project_groups")
    .select("*");
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { project_groups }
  };
}

function ProjectGroups({ project_groups }) {
  const router = useRouter();

  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true; parallax: 60"
      >
        <div>
          <SearchAcrossProjects title="project_groups"></SearchAcrossProjects>
        </div>

        <div>
          <ReadAllRows
            data={project_groups}
            title="All Project Groups"
          ></ReadAllRows>
        </div>

        <div>
          <MyProjectGroups></MyProjectGroups>
        </div>
      </div>
    </div>
  );
}
export default ProjectGroups;
