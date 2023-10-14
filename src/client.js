import { createClient } from '@supabase/supabase-js';
export const GoogleAnalytics = import.meta.env.VITE_GA
const URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY
export const supabase = createClient(URL, SUPABASE_API_KEY)