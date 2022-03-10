import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_APP_SUPABASE_URL,
  process.env.NEXT_APP_SUPABASE_SERVICE_ROLE
);

export default async function handler(request, response) {
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", request.body);

  const { data: logs } = await supabase
    .from("logs")
    .select("*")
    .eq("user_id", request.body);

  const { data: milestones } = await supabase
    .from("milestones")
    .select("*")
    .eq("user_id", request.body);

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", request.body);

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", request.body);

  response.end({ documents, logs, milestones, projects, tasks });
}
