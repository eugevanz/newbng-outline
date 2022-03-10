import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_APP_SUPABASE_URL,
  process.env.NEXT_APP_SUPABASE_SERVICE_ROLE
);

export default async function handler(request, response) {
  const { data } = await supabase
    .from('projects')
    .select("*")
    .eq("user_id", request.body);

  response.status(200).json({
    body: data
  });
}
