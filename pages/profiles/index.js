import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../context/auth-context";
import SearchAcrossProjects from "../../components/search-across-projects";
import ReadAllRows from "../../components/read-all-rows";
import Delete from "../../components/delete";
import ProfileDetails from "../../components/profile-details";

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

  useEffect(() => {
    fetch("/api/profiles")
      .then((body) => body.data)
      .then((data) => setProfiles(data));
  }, []);

  useEffect(() => {
    profile &&
      fetch(`/api/selected/profile/${profile.id}`)
        .then((body) => body.data)
        .then((data) => {
          setDocuments(data.documents);
          setLogs(data.logs);
          setMilestones(data.milestones);
          setProjects(data.projects);
          setTasks(data.tasks);
        });
  }, [profile]);

  useEffect(() => !user && router.push("/"));

  return (
    <div className="uk-width-expand@m">
      <div
        className="uk-child-width-1-2@m js-filter"
        data-uk-grid="masonry: true"
      >
        <div>
          <SearchAcrossProjects title="profiles"></SearchAcrossProjects>
        </div>

        <div>
          {profiles && (
            <ReadAllRows
              data={profiles}
              title="All Profiles"
              setSelection={setProfile}
            ></ReadAllRows>
          )}
        </div>

        <div>{profile && <ProfileDetails data={profile}></ProfileDetails>}</div>

        <div>
          {documents && (
            <ReadAllRows
              data={documents}
              title="User's documents"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {logs && <ReadAllRows data={logs} title="User's logs"></ReadAllRows>}
        </div>

        <div>
          {milestones && (
            <ReadAllRows
              data={milestones}
              title="User's milestones"
            ></ReadAllRows>
          )}
        </div>

        <div>
          {projects && (
            <ReadAllRows data={projects} title="User's projects"></ReadAllRows>
          )}
        </div>

        <div>
          {tasks && (
            <ReadAllRows data={tasks} title="User's tasks"></ReadAllRows>
          )}
        </div>

        <div>
          {profile && <Delete item={profile} table="profiles"></Delete>}
        </div>
      </div>
    </div>
  );
}
export default Profiles;
