import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_APP_SUPABASE_URL,
  process.env.NEXT_APP_SUPABASE_SERVICE_ROLE
);

export default async function handler(request, response) {
  const { data: projects,error } = await supabase
    .from("projects")
    .select("*")
    .eq("project_group_id", request.query);
    error && console.log(error);
  response.end({ projects });
}
