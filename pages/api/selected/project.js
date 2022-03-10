import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_APP_SUPABASE_URL,
  process.env.NEXT_APP_SUPABASE_SERVICE_ROLE
);

export default async function handler(request, response) {
  const { data: owner } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", request.body.user_id)
    .single();

  const { data: task } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", request.body.project_id)
    .single();

  response.end({ owner, task });
}
