import { useState, useEffect, createContext, useContext } from "react";
import supabase from "./auth-context";

const DocumentContext = createContext(null);
const LogContext = createContext(null);
const MilestoneContext = createContext(null);
const ProfileContext = createContext(null);
const ProjectGroupContext = createContext(null);
const ProjectContext = createContext(null);
const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const user = supabase.auth.user();

  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [myTasks, setMyTasks] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(
    () => async () => {
      const { data: tasks } = await supabase.from("tasks").select("*");
      setTasks(tasks);

      const { data: myTasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id);
      setMyTasks(myTasks);
    },
    [user]
  );

  useEffect(
    () => async () => {
      const { data: owner } =
        task &&
        (await supabase
          .from("profiles")
          .select("*")
          .eq("id", task.user_id)
          .single());
      setOwner(owner);

      const { data: project } =
        task &&
        (await supabase
          .from("projects")
          .select("*")
          .eq("id", task.project_id)
          .single());
      setProject(project);
    },
    [task]
  );

  return (
    <TaskContext.Provider
      value={{
        task,
        setTask,
        tasks,
        setTasks,
        myTasks,
        setMyTasks,
        owner,
        setOwner,
        project,
        setProject
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function ProjectProvider({ children }) {
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

export function ProjectGroupProvider({ children }) {
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

export function ProfileProvider({ children }) {
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

export function MilestoneProvider({ children }) {
  const user = supabase.auth.user();

  const [milestone, setMilestone] = useState(null);
  const [milestones, setMilestones] = useState(null);
  const [myMilestones, setMyMilestones] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(
    () => async () => {
      const { data: milestones } = await supabase
        .from("milestones")
        .select("*");
      setMilestones(milestones);

      const { data: myMilestones } = await supabase
        .from("milestones")
        .select("*")
        .eq("user_id", user.id);
      setMyMilestones(myMilestones);
    },
    [user]
  );

  useEffect(
    () => async () => {
      const { data: owner } =
        milestone &&
        (await supabase
          .from("profiles")
          .select("*")
          .eq("id", milestone.user_id)
          .single());
      setOwner(owner);

      const { data: project } =
        milestone &&
        (await supabase
          .from("projects")
          .select("*")
          .eq("id", milestone.project_id)
          .single());
      setProject(project);
    },
    [milestone]
  );

  return (
    <MilestoneContext.Provider
      value={{
        milestone,
        setMilestone,
        milestones,
        setMilestones,
        myMilestones,
        setMyMilestones,
        owner,
        setOwner,
        project,
        setProject
      }}
    >
      {children}
    </MilestoneContext.Provider>
  );
}

export function LogProvider({ children }) {
  const user = supabase.auth.user();

  const [log, setLog] = useState(null);
  const [logs, setLogs] = useState(null);
  const [myLogs, setMyLogs] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);

  useEffect(
    () => async () => {
      const { data: logs } = await supabase.from("logs").select("*");
      setLogs(logs);

      const { data: myLogs } = await supabase
        .from("logs")
        .select("*")
        .eq("user_id", user.id);
      setMyLogs(myLogs);
    },
    [user]
  );

  useEffect(
    () => async () => {
      const { data: owner } =
        log &&
        (await supabase
          .from("profiles")
          .select("*")
          .eq("id", log.user_id)
          .single());
      setOwner(owner);

      const { data: task } =
        log &&
        (await supabase
          .from("tasks")
          .select("*")
          .eq("id", log.task_id)
          .single());
      setTask(task);
    },
    [log]
  );

  return (
    <LogContext.Provider
      value={{
        log,
        setLog,
        logs,
        setLogs,
        myLogs,
        setMyLogs,
        owner,
        setOwner,
        task,
        setTask
      }}
    >
      {children}
    </LogContext.Provider>
  );
}

export function DocumentProvider({ children }) {
  const user = supabase.auth.user();

  const [document, setDocument] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [myDocuments, setMyDocuments] = useState(null);
  const [owner, setOwner] = useState(null);
  const [task, setTask] = useState(null);

  // Load initial data and set up listeners
  useEffect(
    () => async () => {
      const { data: documents } = await supabase.from("documents").select("*");
      setDocuments(documents);

      const { data: myDocuments } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id);
      setMyDocuments(myDocuments);
    },
    [user]
  );

  useEffect(
    () => async () => {
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
    },
    [document]
  );

  return (
    <DocumentContext.Provider
      value={{
        document,
        setDocument,
        documents,
        setDocuments,
        myDocuments,
        setMyDocuments,
        owner,
        setOwner,
        task,
        setTask
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocumentStore() {
  const context = useContext(DocumentContext);
  if (!context)
    throw new Error("useDocumentStore must be used inside a `Provider`");
  return context;
}
export function useLogStore() {
  const context = useContext(LogContext);
  if (!context) throw new Error("useLogStore must be used inside a `Provider`");
  return context;
}
export function useMilestoneStore() {
  const context = useContext(MilestoneContext);
  if (!context)
    throw new Error("useMilestoneStore must be used inside a `Provider`");
  return context;
}
export function useProfileStore() {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfileStore must be used inside a `Provider`");
  return context;
}
export function useProjectGroupStore() {
  const context = useContext(ProjectGroupContext);
  if (!context)
    throw new Error("useProjectGroupStore must be used inside a `Provider`");
  return context;
}
export function useProjectStore() {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProjectStore must be used inside a `Provider`");
  return context;
}
export function useTaskStore() {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskStore must be used inside a `Provider`");
  return context;
}
