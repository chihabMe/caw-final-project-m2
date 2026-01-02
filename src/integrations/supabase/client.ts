import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient | null = null;
let initializationAttempted = false;


function getSupabaseClient(): SupabaseClient | null {
  if (initializationAttempted) {
    return supabaseInstance;
  }
  
  initializationAttempted = true;
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase credentials not found. Database features will be disabled.');
    return null;
  }

  // Basic validation: Supabase keys are JWTs (3 parts separated by dots)
  // The error "split(...)[1] is undefined" likely comes from trying to parse a non-JWT key
  if (supabaseKey.split('.').length < 3) {
    console.warn('⚠️ Invalid Supabase Key format. It should be a JWT (3 parts separated by dots). Database features disabled.');
    return null;
  }
  
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
    return supabaseInstance;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    return null;
  }
}

// Export as a getter that lazily initializes
export const supabase = getSupabaseClient();
