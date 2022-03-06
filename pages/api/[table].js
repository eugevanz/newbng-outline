import { createClient } from "@supabase/supabase-js";

async function table(req, res) {
  const client = createClient(
    process.env.NEXT_APP_SUPABASE_URL,
    process.env.NEXT_APP_SUPABASE_SERVICE_ROLE
  );

  const { table } = req.query;

  if (req.method === "GET") {
    const { data } = await client.from(table).select("*");
    res.status(200).send(data);
  } else if (req.method === "POST") {
    await client
      .from(table)
      .insert([req.body])
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  } else if (req.method === "PUT") {
    await client
      .from(table)
      .update(req.body.formData)
      .eq("id", req.body.id)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  } else if (req.method === "DELETE") {
    await client
      .from(table)
      .delete()
      .eq("id", req.body.id)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
};
export default table;