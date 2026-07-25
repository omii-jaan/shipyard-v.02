import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * When the Supabase env vars are absent (e.g. preview without auth configured),
 * fall back to a harmless placeholder client so the app still boots and the
 * marketing/landing pages render. Auth calls simply resolve to "no session".
 * As soon as the real env vars are provided, the live client is used.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    "[v0] Supabase env vars missing — running in unauthenticated preview mode. " +
      "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable auth."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "public-anon-placeholder-key"
);
