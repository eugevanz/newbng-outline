import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyProjectGroups from "../../components/my-project-groups";

const user = supabase.auth.user();

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const { data: project_groups } = await supabase
    .from("project_groups")
    .select("*");

  const { data: myProject_groups } = await supabase
    .from("project_groups")
    .select("*")
    .eq("user_id", user.id);
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { project_groups, myProject_groups }
  };
}

function ProjectGroups({ project_groups, myProject_groups }) {
  const router = useRouter();

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

        {project_groups && (
          <div>
            <ReadAllRows
              data={project_groups}
              title="All Project Groups"
            ></ReadAllRows>
          </div>
        )}

        <div>
          <MyProjectGroups data={myProject_groups}></MyProjectGroups>
        </div>
      </div>
    </div>
  );
}
export default ProjectGroups;
