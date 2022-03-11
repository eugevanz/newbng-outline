import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_APP_SUPABASE_URL,
  process.env.NEXT_APP_SUPABASE_SERVICE_ROLE
);

export default async function handler(request, response) {
  const { data: documents,error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", request.query);

  const { data: logs,error:er } = await supabase
    .from("logs")
    .select("*")
    .eq("user_id", request.query);

  const { data: milestones,error:er1 } = await supabase
    .from("milestones")
    .select("*")
    .eq("user_id", request.query);

  const { data: projects,error:er2 } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", request.query);

  const { data: tasks,error:er3 } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", request.query);
    error && console.log(error);
    er && console.log(er);
    er1 && console.log(er1);
    er2 && console.log(er2);
    er3 && console.log(er3);
  response.end({ documents, logs, milestones, projects, tasks });
}
