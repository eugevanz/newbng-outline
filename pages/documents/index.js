import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyDocuments from "../../components/my-documents";

const user = supabase.auth.user();

export async function getServerSideProps() {
  // Get external data from the file system, API, DB, etc.
  const { data: documents } = await supabase.from("documents").select("*");

  const { data: myDocuments } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id);
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { documents, myDocuments }
  };
}

function Documents({ documents, myDocuments }) {
  const router = useRouter();

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
          <MyDocuments data={myDocuments}></MyDocuments>
        </div>
      </div>
    </div>
  );
}
export default Documents;
