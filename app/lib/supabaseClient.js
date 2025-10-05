import { createClient } from '@supabase/supabase-js';

// Ensure these are defined in your .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase environment variables missing!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
