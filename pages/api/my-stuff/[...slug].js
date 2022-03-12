import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(request, response) {
  const { data, error } = await supabase
    .from(request.query.slug[0])
    .select("*")
    .eq("user_id", request.query.slug[1]);
  error && console.log(error);
  response.end(data);
}
