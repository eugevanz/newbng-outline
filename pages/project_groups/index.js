import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyProjectGroups from "../../components/my-project-groups";

function ProjectGroups() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [project_groups, setProject_groups] = useState(null);
  const [myProject_groups, setMyProject_groups] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: project_groups } = await supabase
      .from("project_groups")
      .select("*");
    setProject_groups(project_groups);

    const { data: myProject_groups } = await supabase
      .from("project_groups")
      .select("*")
      .eq("user_id", user.id);
    setMyProject_groups(myProject_groups);
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
