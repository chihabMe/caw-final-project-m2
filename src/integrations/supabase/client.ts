import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client if credentials are missing to prevent errors
const DUMMY_URL = 'https://placeholder.supabase.co';
const DUMMY_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Missing Supabase credentials. Using placeholder client. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to environment variables.');
}

export const supabase = createClient(
  supabaseUrl || DUMMY_URL, 
  supabaseKey || DUMMY_KEY
);
