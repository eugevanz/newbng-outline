import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(request, response) {
  const { data: owner, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", request.query[0])
    .single();

  const { data: task, error: er } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", request.query[1])
    .single();
  error && console.log(error);
  er && console.log(er);
  response.end({ owner, task });
}
