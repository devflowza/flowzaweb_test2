import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * The anon key is public-by-design; write access is enforced by RLS
 * (contact_submissions allows INSERT only). The site must render fully
 * without these vars — the contact form then falls back to WhatsApp.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  client ??= createClient(url!, anonKey!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
