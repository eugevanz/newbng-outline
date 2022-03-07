import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyDocuments from "../../components/my-documents";

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const { data: documents } = await supabase.from("documents").select("*");
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { documents }
  };
}

function Documents({ documents }) {
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
          <SearchAcrossProjects title="documents"></SearchAcrossProjects>
        </div>

        {documents&&<div>
          <ReadAllRows data={documents} title="All documents"></ReadAllRows>
        </div>}

        <div>
          <MyDocuments></MyDocuments>
        </div>
      </div>
    </div>
  );
}
export default Documents;
