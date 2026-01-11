import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log(supabaseUrl, supabaseKey);

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

  // Basic validation: Supabase keys are JWTs (3 parts separated by dots) or the new sb_publishable_ format
  const isValidKey = supabaseKey.startsWith('sb_publishable_') || supabaseKey.split('.').length >= 3;

  if (!isValidKey) {
    console.warn('⚠️ Invalid Supabase Key format. It should be a JWT (3 parts separated by dots) or an sb_publishable_ key. Database features disabled.');
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
