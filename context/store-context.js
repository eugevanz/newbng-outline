import { useState, useEffect } from "react";
import supabase from "./auth-context";

export default function useStore() {
  const user = supabase.auth.user();

  const [document, setDocument] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [log, setLog] = useState(null);
  const [logs, setLogs] = useState(null);
  const [milestone, setMilestone] = useState(null);
  const [milestones, setMilestones] = useState(null);
  const [myDocuments, setMyDocuments] = useState(null);
  const [myLogs, setMyLogs] = useState(null);
  const [myMilestones, setMyMilestones] = useState(null);
  const [myProject_groups, setMyProject_groups] = useState(null);
  const [myProjects, setMyProjects] = useState(null);
  const [myTasks, setMyTasks] = useState(null);
  const [owner, setOwner] = useState(null);
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const [project_group, setProject_group] = useState(null);
  const [project_groups, setProject_groups] = useState(null);
  const [task, setTask] = useState(null);
  const [tasks, setTasks] = useState(null);

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

      const { data: logs } = await supabase.from("logs").select("*");
      setLogs(logs);

      const { data: myLogs } = await supabase
        .from("logs")
        .select("*")
        .eq("user_id", user.id);
      setMyLogs(myLogs);

      const { data: milestones } = await supabase
        .from("milestones")
        .select("*");
      setMilestones(milestones);

      const { data: myMilestones } = await supabase
        .from("milestones")
        .select("*")
        .eq("user_id", user.id);
      setMyMilestones(myMilestones);

      const { data: profiles } = await supabase.from("profiles").select("*");
      setProfiles(profiles);

      const { data: project_groups } = await supabase
        .from("project_groups")
        .select("*");
      setProject_groups(project_groups);

      const { data: myProject_groups } = await supabase
        .from("project_groups")
        .select("*")
        .eq("user_id", user.id);
      setMyProject_groups(myProject_groups);

      const { data: projects } = await supabase.from("projects").select("*");
      setProjects(projects);

      const { data: myProjects } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id);
      setMyProjects(myProjects);

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

  return {
    // We can export computed values here
    document,
    setDocument,
    documents,
    setDocuments,
    log,
    setLog,
    logs,
    setLogs,
    milestone,
    setMilestone,
    milestones,
    setMilestones,
    myDocuments,
    setMyDocuments,
    myLogs,
    setMyLogs,
    myMilestones,
    setMyMilestones,
    myProject_groups,
    setMyProject_groups,
    myProjects,
    setMyProjects,
    myTasks,
    setMyTasks,
    owner,
    setOwner,
    project,
    setProject,
    projects,
    setProjects,
    profile,
    setProfile,
    profiles,
    setProfiles,
    project_group,
    setProject_group,
    project_groups,
    setProject_groups,
    task,
    setTask,
    tasks,
    setTasks
  };
}
