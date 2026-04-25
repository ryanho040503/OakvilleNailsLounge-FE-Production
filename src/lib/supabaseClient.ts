import { createClient } from "@supabase/supabase-js";

import { appConfig } from "@/config";

const supabaseUrl = appConfig.supabase.url;
const supabaseAnonKey = appConfig.supabase.anonKey;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
