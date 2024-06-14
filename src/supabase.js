// src/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jfgyghtxnctuyxjlcpih.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZ3lnaHR4bmN0dXl4amxjcGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwODYxMzIsImV4cCI6MjAzMjY2MjEzMn0.-ofwp9bqxMlXKHiYReZ5plTDAA7DpZdSRz5y-RziYMg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;