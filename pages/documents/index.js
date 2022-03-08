import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import useStore from "../../context/store-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyDocuments from "../../components/my-documents";
import DocumentDetails from "../../components/document-details";
import Delete from "../../components/delete";

function Documents() {
  const {
    documents,
    setDocument,
    myDocuments,
    document,
    owner,
    task
  } = useStore();
  const router = useRouter();
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="documents"></SearchAcrossProjects>
        </div>

        <div>
          {documents ? (
            <ReadAllRows
              data={documents}
              title="All documents"
              setSelection={setDocument}
            ></ReadAllRows>
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

        <div>
          {document & owner & task ? (
            <DocumentDetails
              data={document}
              owner={owner}
              task={task}
            ></DocumentDetails>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>

        <div>
          {document ? (
            <Delete item={document} table="documents"></Delete>
          ) : (
            <div data-uk-spinner></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Documents;
