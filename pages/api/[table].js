import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_APP_SUPABASE_URL,
  process.env.NEXT_APP_SUPABASE_SERVICE_ROLE
);

export default async function handler(request, response) {
  if (request.method === "GET") {
    const { data } = await supabase.from(request.query).select("*");
    response.end(data);
  } else if (request.method === "POST") {
    await supabase
      .from(request.query)
      .insert([request.body])
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  } else if (request.method === "PUT") {
    await supabase
      .from(request.query)
      .update(request.body.formData)
      .eq("id", request.body.id)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  } else if (request.method === "DELETE") {
    await supabase
      .from(request.query)
      .delete()
      .eq("id", request.body.id)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
}
