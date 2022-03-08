import { useState, useEffect, createContext,useContext } from "react";
import supabase from "./auth-context";

const ProjectGroupContext = createContext(null);

 function ProjectGroupProvider({ children }) {
  const [project_group, setProject_group] = useState(null);
  const [project_groups, setProject_groups] = useState(null);
  const [projects, setProjects] = useState(null);

  useEffect(
    () => async () => {
      const { data: project_groups } = await supabase
        .from("project_groups")
        .select("*");
      setProject_groups(project_groups);
    },
    []
  );

  useEffect(
    () => async () => {
      const { data: projects } =
        project_group &&
        (await supabase
          .from("projects")
          .select("*")
          .eq("project_group_id", project_group.id));
      setProjects(projects);
    },
    [project_group]
  );

  return (
    <ProjectGroupContext.Provider
      value={{
        project_group,
        setProject_group,
        project_groups,
        setProject_groups,
        projects,
        setProjects
      }}
    >
      {children}
    </ProjectGroupContext.Provider>
  );
}

export default ProjectGroupProvider;

export function useProjectGroupStore() {
  const context = useContext(ProjectGroupContext);
  if (!context)
    throw new Error("useProjectGroupStore must be used inside a `Provider`");
  return context;
}