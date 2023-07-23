import { createClient } from '@supabase/supabase-js';
const URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY
export const supabase = createClient(URL, SUPABASE_API_KEY)