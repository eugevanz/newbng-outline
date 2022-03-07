import DocumentDetails from "../../components/document-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Document() {
  const router = useRouter();
  const [document, setDocument] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);

  async function getPageData(context) {
    // Get external data from the file system, API, DB, etc.
    const { data: document } = await supabase
      .from("documents")
      .select("*")
      .eq("id", router.query.id)
      .single();
    setDocument(document);

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
  }

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
        {document & owner & task ? (
          <div>
            <DocumentDetails
              data={document}
              owner={owner}
              task={task}
            ></DocumentDetails>
          </div>
        ):<div data-uk-spinner></div>}

          <div>
        {document ?
            <Delete item={document} table="documents"></Delete>
            :<div data-uk-spinner></div>}
          </div>
      </div>
    </div>
  );
}
export default Document;
