import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import MyDocuments from "../../components/my-documents";
import DocumentDetails from "../../components/document-details";
import Delete from "../../components/delete";

function Documents(props) {
  const router = useRouter();
  const user = supabase.auth.user();
  const [document, setDocument] = useState(null);

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
          {props.documents && (
            <ReadAllRows
              data={props.documents}
              title="All documents"
              setSelection={setDocument}
            ></ReadAllRows>
          )}
        </div>

        <div>
          {props.documents & user && (
            <MyDocuments
              data={props.documents.filter((item) => item.user_id === user.id)}
            ></MyDocuments>
          )}
        </div>

        <div>
          {document & props.profiles & props.tasks && (
            <DocumentDetails
              data={document}
              owner={props.profiles.find(
                (item) => item.id === document.user_id
              )}
              task={props.tasks.find((item) => item.id === document.task_id)}
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
