import { useState, useEffect, createContext,useContext } from "react";
import supabase from "./auth-context";

const ProjectContext = createContext(null);

function ProjectProvider({ children }) {
  const user = supabase.auth.user();

  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState(null);
  const [myProjects, setMyProjects] = useState(null);
  const [owner, setOwner] = useState(null);
  const [tasks, setTasks] = useState(null);

  useEffect(
    () => async () => {
      const { data: projects } = await supabase.from("projects").select("*");
      setProjects(projects);

      const { data: myProjects } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id);
      setMyProjects(myProjects);
    },
    [user]
  );

  useEffect(
    () => async () => {
      const { data: owner } =
        project &&
        (await supabase
          .from("profiles")
          .select("*")
          .eq("id", project.user_id)
          .single());
      setOwner(owner);

      const { data: tasks } =
        project &&
        (await supabase.from("tasks").select("*").eq("project_id", project.id));
      setTasks(tasks);
    },
    [project]
  );

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        projects,
        setProjects,
        myProjects,
        setMyProjects,
        owner,
        setOwner,
        tasks,
        setTasks
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;

export function useProjectStore() {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProjectStore must be used inside a `Provider`");
  return context;
}