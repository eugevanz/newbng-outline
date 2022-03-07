import ProfileDetails from "../../components/profile-details";
import supabase from "../../context/auth-context";
import Delete from "../../components/delete";
import ReadAllRows from "../../components/read-all-rows";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [logs, setLogs] = useState(null);
  const [milestones, setMilestones] = useState(null);
  const [projects, setProjects] = useState(null);
  const [tasks, setTasks] = useState(null);

  async function getPageData() {
    // Get external data from the file system, API, DB, etc.
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", router.query.id)
      .single();
    setProfile(profile);

    const { data: documents } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", router.query.id);
    setDocuments(documents);

    const { data: logs } = await supabase
      .from("logs")
      .select("*")
      .eq("user_id", router.query.id);
    setLogs(logs);

    const { data: milestones } = await supabase
      .from("milestones")
      .select("*")
      .eq("user_id", router.query.id);
    setMilestones(milestones);

    const { data: projects } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", router.query.id);
    setProjects(projects);

    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", router.query.id);
    setTasks(tasks);
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
        {profile && (
          <div>
            <ProfileDetails data={profile}></ProfileDetails>
          </div>
        )}

        {documents && (
          <div>
            <ReadAllRows
              data={documents}
              title="User's documents"
            ></ReadAllRows>
          </div>
        )}

        {logs && (
          <div>
            <ReadAllRows data={logs} title="User's logs"></ReadAllRows>
          </div>
        )}

        {milestones && (
          <div>
            <ReadAllRows
              data={milestones}
              title="User's milestones"
            ></ReadAllRows>
          </div>
        )}

        {projects && (
          <div>
            <ReadAllRows data={projects} title="User's projects"></ReadAllRows>
          </div>
        )}

        {tasks && (
          <div>
            <ReadAllRows data={tasks} title="User's tasks"></ReadAllRows>
          </div>
        )}

        {profile && (
          <div>
            <Delete item={profile} table="profiles"></Delete>
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
