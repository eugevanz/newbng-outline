import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_APP_SUPABASE_URL,
  process.env.NEXT_APP_SUPABASE_SERVICE_ROLE
);

export default async function handler(request, response) {
  const { data } = await supabase
    .from(request.query[0])
    .select("*")
    .eq("user_id", request.query[1]);

  response.end(data);
}
