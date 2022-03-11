import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_APP_SUPABASE_URL,
  process.env.NEXT_APP_SUPABASE_SERVICE_ROLE
);

export default async function handler(request, response) {
  const { data: owner,error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", request.query[0])
    .single();

  const { data: project,error:er } = await supabase
    .from("projects")
    .select("*")
    .eq("id", request.query[1])
    .single();
    error && console.log(error);
    er && console.log(er);
  response.end({ owner, project });
}
