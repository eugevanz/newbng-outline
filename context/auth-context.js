import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mxdcofslcaekalvrfqmj.supabase.co";
const supabaseServiceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQwMDk2MjIxLCJleHAiOjE5NTU2NzIyMjF9.jKb0HEb3cBt9sEHx4fO3bsVCKCAA85VEySg9W6jkpts";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default supabase;
