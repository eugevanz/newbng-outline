import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import Delete from "../../components/delete";
import ProfileDetails from "../../components/profile-details";
import ProfileProvider from "../../context/store-profile-context";

function Profiles() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [profile, setProfile] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [logs, setLogs] = useState(null);
  const [milestones, setMilestones] = useState(null);
  const [projects, setProjects] = useState(null);
  const [tasks, setTasks] = useState(null);

  useEffect(
    () => async () => {
      const { data: profiles } = await supabase.from("profiles").select("*");
      setProfiles(profiles);
    },
    []
  );

  useEffect(
    () => async () => {
      const { data: documents } =
        profile &&
        (await supabase
          .from("documents")
          .select("*")
          .eq("user_id", profile.id));
      setDocuments(documents);

      const { data: logs } =
        profile &&
        (await supabase.from("logs").select("*").eq("user_id", profile.id));
      setLogs(logs);

      const { data: milestones } =
        profile &&
        (await supabase
          .from("milestones")
          .select("*")
          .eq("user_id", profile.id));
      setMilestones(milestones);

      const { data: projects } =
        profile &&
        (await supabase.from("projects").select("*").eq("user_id", profile.id));
      setProjects(projects);

      const { data: tasks } =
        profile &&
        (await supabase.from("tasks").select("*").eq("user_id", profile.id));
      setTasks(tasks);
    },
    [profile]
  );

  useEffect(() => !user && router.push("/"));

  return (
    <ProfileProvider>
      <div className="uk-width-expand@m">
        <div
          className="uk-child-width-1-2@m js-filter"
          data-uk-grid="masonry: true"
        >
          <div>
            <SearchAcrossProjects title="profiles"></SearchAcrossProjects>
          </div>

          <div>
            {profiles ? (
              <ReadAllRows
                data={profiles}
                title="All Profiles"
                setSelection={setProfile}
              ></ReadAllRows>
            ) : (
              <div data-uk-spinner></div>
            )}
          </div>

          <div>
            {profile ? (
              <ProfileDetails data={profile}></ProfileDetails>
            ) : (
              <div data-uk-spinner></div>
            )}
          </div>

          <div>
            {documents ? (
              <ReadAllRows
                data={documents}
                title="User's documents"
              ></ReadAllRows>
            ) : (
              <div data-uk-spinner></div>
            )}
          </div>

          <div>
            {logs ? (
              <ReadAllRows data={logs} title="User's logs"></ReadAllRows>
            ) : (
              <div data-uk-spinner></div>
            )}
          </div>

          <div>
            {milestones ? (
              <ReadAllRows
                data={milestones}
                title="User's milestones"
              ></ReadAllRows>
            ) : (
              <div data-uk-spinner></div>
            )}
          </div>

          <div>
            {projects ? (
              <ReadAllRows
                data={projects}
                title="User's projects"
              ></ReadAllRows>
            ) : (
              <div data-uk-spinner></div>
            )}
          </div>

          <div>
            {tasks ? (
              <ReadAllRows data={tasks} title="User's tasks"></ReadAllRows>
            ) : (
              <div data-uk-spinner></div>
            )}
          </div>

          <div>
            {profile ? (
              <Delete item={profile} table="profiles"></Delete>
            ) : (
              <div data-uk-spinner></div>
            )}
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
}
export default Profiles;
