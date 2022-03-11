import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_APP_SUPABASE_URL,
  process.env.NEXT_APP_SUPABASE_SERVICE_ROLE
);

export default async function handler(request, response) {
  const { data: owner } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", request.query[0])
    .single();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", request.query[1])
    .single();

  response.end({ owner, project });
}
