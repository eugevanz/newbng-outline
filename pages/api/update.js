import { createClient } from "@supabase/supabase-js";

async function update(req, res) {
  const client = createClient(
    process.env.PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { table } = req.query;

  const { data } = await client.from(table).select("*");

  res.status(200).send(data);
}
export default update;
