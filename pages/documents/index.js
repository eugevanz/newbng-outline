import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyDocuments from "../../components/my-documents";
import DocumentDetails from "../../components/document-details";
import Delete from "../../components/delete";
import DocumentProvider from "../../context/store-doc-context";

function Documents() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [document, setDocument] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [myDocuments, setMyDocuments] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);

  // Load initial data and set up listeners
  useEffect(
    () => async () => {
      const { data: documents } = await supabase.from("documents").select("*");
      setDocuments(documents);

      const { data: myDocuments } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id);
      setMyDocuments(myDocuments);
    },
    [user]
  );

  useEffect(
    () => async () => {
      const { data: owner } =
        document &&
        (await supabase
          .from("profiles")
          .select("*")
          .eq("id", document.user_id)
          .single());
      setOwner(owner);

      const { data: task } =
        document &&
        (await supabase
          .from("tasks")
          .select("*")
          .eq("id", document.task_id)
          .single());
      setTask(task);
    },
    [document]
  );

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
    </DocumentProvider>
  );
}
export default Documents;
