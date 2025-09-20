// src/supabase/client.ts
// Supabase client for BROWSER usage only.
// IMPORTANT: Firebase remains your authentication provider. We only use Supabase for new data storage.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  // Helps catch missing env quickly in dev
  console.warn(
    '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Check your .env and restart the dev server.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
