import DocumentDetails from "../../components/document-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";

export async function getServerSideProps(context) {
  // Get external data from the file system, API, DB, etc.
  const { data: document } = await supabase
    .from("documents")
    .select("*")
    .eq("id", context.query.id)
    .single();

  const { data: owner } =
    document &&
    (await supabase
      .from("profiles")
      .select("*")
      .eq("id", document.user_id)
      .single());

  const { data: task } =
    document &&
    (await supabase
      .from("tasks")
      .select("*")
      .eq("id", document.task_id)
      .single());
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { document, owner, task }
  };
}

function Document({ document, owner, task }) {
  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true; parallax: 60"
      >
        {document & owner & task && (
          <div>
            <DocumentDetails
              data={document}
              owner={owner}
              task={task}
            ></DocumentDetails>
          </div>
        )}

        {document && (
          <div>
            <Delete item={document} table="documents"></Delete>
          </div>
        )}
      </div>
    </div>
  );
}
export default Document;
