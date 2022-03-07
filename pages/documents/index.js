import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyDocuments from "../../components/my-documents";

function Documents() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [documents, setDocuments] = useState(null);
  const [myDocuments, setMyDocuments] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: documents } = await supabase.from("documents").select("*");

    const { data: myDocuments } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", user.id);

    setDocuments(documents);
    setMyDocuments(myDocuments);
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
          <SearchAcrossProjects title="documents"></SearchAcrossProjects>
        </div>

        <div>
          {documents ? (
            <ReadAllRows data={documents} title="All documents"></ReadAllRows>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {myDocuments ? (
            <MyDocuments data={myDocuments}></MyDocuments>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Documents;
