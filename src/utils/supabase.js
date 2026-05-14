import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey)

if (!hasSupabaseConfig) {
  console.error('Missing Supabase env vars: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY')
}

const fallbackUrl = 'https://placeholder.supabase.co'
const fallbackKey = 'public-anon-key-placeholder'

export const supabase = createClient(
  hasSupabaseConfig ? supabaseUrl : fallbackUrl,
  hasSupabaseConfig ? supabaseAnonKey : fallbackKey
)
