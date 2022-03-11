import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Example of how to verify and get user data server-side.
export default async function getUser(request, response) {
  const { data: user, error } = await supabase.auth.api.getUser(
    request.headers.token
  );

  if (error) return response.status(401).json({ error: error.message });
  return response.end(user);
}
