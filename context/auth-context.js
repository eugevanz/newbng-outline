import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mxdcofslcaekalvrfqmj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDA5NjIyMSwiZXhwIjoxOTU1NjcyMjIxfQ.Se-JTXQgcDXGejhCHMY1Y_TdxDn38TtpWuqlrJ-Br_8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
