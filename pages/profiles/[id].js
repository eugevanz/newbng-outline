import ProfileDetails from "../../components/profile-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";
import ReadAllRows from "../../components/read-all-rows";

export async function getStaticPaths() {
  const { data: profiles } = await supabase.from("profiles").select("*");

  const paths = profiles.map((profile) => ({
    params: { id: profile.id.toString() }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  // Get external data from the file system, API, DB, etc.
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", context.params.id)
    .single();

  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", context.params.id);

  const { data: logs } = await supabase
    .from("logs")
    .select("*")
    .eq("user_id", context.params.id);

  const { data: milestones } = await supabase
    .from("milestones")
    .select("*")
    .eq("user_id", context.params.id);

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", context.params.id);

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", context.params.id);
  // The value of the `props` key will be
  //  passed to the component
  return {
    props: { profile, documents, logs, milestones, projects, tasks }
  };
}

function Profile({ profile, documents, logs, milestones, projects, tasks }) {
  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true; parallax: 60"
      >
        <div>
          <ProfileDetails data={profile}></ProfileDetails>
        </div>

        <div>
          <ReadAllRows data={documents} title="User's documents"></ReadAllRows>
        </div>

        <div>
          <ReadAllRows data={logs} title="User's logs"></ReadAllRows>
        </div>

        <div>
          <ReadAllRows
            data={milestones}
            title="User's milestones"
          ></ReadAllRows>
        </div>

        <div>
          <ReadAllRows data={projects} title="User's projects"></ReadAllRows>
        </div>

        <div>
          <ReadAllRows data={tasks} title="User's tasks"></ReadAllRows>
        </div>

        <div>
          <Delete item={profile} table="profiles"></Delete>
        </div>
      </div>
    </div>
  );
}
export default Profile;
