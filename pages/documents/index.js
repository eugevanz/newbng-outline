import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyDocuments from "./my-documents";

function Documents() {
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
            <SearchAcrossProjects title="documents"></SearchAcrossProjects>
          </div>

          <div>
            <ReadAllRows table="documents" title="All Documents"></ReadAllRows>
          </div>

          <div>
            <MyDocuments></MyDocuments>
          </div>
        </div>
      )}
    </div>
  );
}
export default Documents;