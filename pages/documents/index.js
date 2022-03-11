import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyDocuments from "../../components/my-documents";
import DocumentDetails from "../../components/document-details";
import Delete from "../../components/delete";

function Documents() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [document, setDocument] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [myDocuments, setMyDocuments] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);

  // Load initial data and set up listeners
  useEffect(() => {
    fetch("/api/documents").then((data) => setDocuments(data));
    fetch(`/api/my-stuff/documents/${user.id}`).then((data) =>
      setMyDocuments(data)
    );
  }, [user]);

  useEffect(() => {
    document &&
      fetch(
        `/api/selected/document/${document.user_id}/${document.task_id}`
      ).then((data) => {
        setOwner(data.owner);
        setTask(data.task);
      });
  }, [document]);

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
          {documents && (
            <ReadAllRows
              data={documents}
              title="All documents"
              setSelection={setDocument}
            ></ReadAllRows>
          )}
        </div>

        <div>
          {myDocuments && <MyDocuments data={myDocuments}></MyDocuments>}
        </div>

        <div>
          {document & owner & task && (
            <DocumentDetails
              data={document}
              owner={owner}
              task={task}
            ></DocumentDetails>
          )}
        </div>

        <div>
          {document && <Delete item={document} table="documents"></Delete>}
        </div>
      </div>
    </div>
  );
}
export default Documents;
