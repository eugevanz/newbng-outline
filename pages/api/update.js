import { createClient } from '@supabase/supabase-js';

async function update(req, res) {
  const client = createClient(
    process.env.NEXT_APP_SUPABASE_URL,
    process.env.NEXT_APP_SUPABASE_SERVICE_ROLE
  );

  const { table } = req.query;

  const { data } = await client.from(table).select('*');

  res.status(200).send(data);
};
export default update;