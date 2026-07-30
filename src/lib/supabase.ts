import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client.
 *
 * Intentionally client-safe (no `server-only`): the site is a static export
 * (`output: "export"`), so the contact form talks to Supabase directly from the
 * browser and the `NEXT_PUBLIC_*` values are inlined at build time. That is not
 * a security regression — the anon key is public by design, and write access is
 * enforced by RLS (`contact_submissions` allows INSERT only). The site must
 * render fully without these vars; the contact form then falls back to WhatsApp.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  client ??= createClient(url!, anonKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
