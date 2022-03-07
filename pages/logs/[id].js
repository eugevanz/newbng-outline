import LogDetails from "../../components/log-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";

export async function getStaticPaths() {
  const { data: logs } = await supabase.from("logs").select("*");

  const paths = logs.map((log) => ({ params: { id: log.id.toString() } }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  // Get external data from the file system, API, DB, etc.
  const { data: log } = await supabase
    .from("logs")
    .select("*")
    .eq("id", context.params.id)
    .single();

  const { data: owner } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", log.user_id)
    .single();

  const { data: task } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", log.task_id)
    .single();
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { log, owner, task }
  };
}

function Log({ log, owner, task }) {
  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true; parallax: 60"
      >
        <div>
          <LogDetails data={log} owner={owner} task={task}></LogDetails>
        </div>

        <div>
          <Delete item={log} table="logs"></Delete>
        </div>
      </div>
    </div>
  );
}
export default Log;
