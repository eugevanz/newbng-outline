import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyProjects from "../../components/my-projects";

const user = supabase.auth.user();

export async function getServerSideProps() {
  // Get external data from the file system, API, DB, etc.
  const { data: projects } = await supabase.from("projects").select("*");

  const { data: myProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id);
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { projects, myProjects }
  };
}

function Projects({ projects, myProjects }) {
  const router = useRouter();

  useEffect(() => !user && router.push("/"));

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true; parallax: 60"
      >
        <div>
          <SearchAcrossProjects title="projects"></SearchAcrossProjects>
        </div>

        {projects && (
          <div>
            <ReadAllRows data={projects} title="All Projects"></ReadAllRows>
          </div>
        )}

        <div>
          <MyProjects data={myProjects}></MyProjects>
        </div>
      </div>
    </div>
  );
}
export default Projects;
