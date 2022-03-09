import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import { useDocumentStore } from "../../context/store-doc-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyDocuments from "../../components/my-documents";
import DocumentDetails from "../../components/document-details";
import Delete from "../../components/delete";
import DocumentProvider from "../../context/store-doc-context";

function Documents() {
  const {
    documents,
    setDocument,
    myDocuments,
    document,
    owner,
    task
  } = useDocumentStore();
  const router = useRouter();
  const user = supabase.auth.user();

  useEffect(() => !user && router.push("/"));

  return (
    <DocumentProvider>
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
    </DocumentProvider>
  );
}
export default Documents;
