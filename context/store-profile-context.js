import { useState, useEffect, createContext,useContext } from "react";
import supabase from "./auth-context";

const ProfileContext = createContext(null);

 function ProfileProvider({ children }) {
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

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        profiles,
        setProfiles,
        documents,
        setDocuments,
        logs,
        setLogs,
        milestones,
        setMilestones,
        projects,
        setProjects,
        tasks,
        setTasks
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;

export function useProfileStore() {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfileStore must be used inside a `Provider`");
  return context;
}