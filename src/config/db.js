import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://xyzcompany.supabase.co", //The unique Supabase URL which is supplied when you create a new project in your project dashboard.
  "publishable-or-anon-key", //The unique Supabase Key which is supplied when you create a new project in your project dashboard.
);
