import { useState, useEffect, createContext, useContext } from "react";
import supabase from "./auth-context";

const MilestoneContext = createContext(null);

 function MilestoneProvider({ children }) {
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

export default MilestoneProvider;

export function useMilestoneStore() {
  const context = useContext(MilestoneContext);
  if (!context)
    throw new Error("useMilestoneStore must be used inside a `Provider`");
  return context;
}