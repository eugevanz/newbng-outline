import { createClient } from '@supabase/supabase-js';

async function api(req, res) {
  const client = createClient(
    process.env.NEXT_APP_SUPABASE_URL,
    process.env.NEXT_APP_SUPABASE_SERVICE_ROLE
  );

  const { data: projects } = await client.from('projects').select('*');
  const { data: tasks } = await client.from('tasks').select('*');
  const { data: milestones } = await client.from('milestones').select('*');
  const { data: profiles } = await client.from('profiles').select('*');
  const { data: project_groups } = await client
    .from('project_groups')
    .select('*');

  res
    .status(200)
    .send({ projects, tasks, milestones, profiles, project_groups });
};
export default api;