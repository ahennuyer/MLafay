import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://xhhnloqqpkjzctlglfrk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoaG5sb3FxcGtqemN0bGdsZnJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIzMjM2OTAsImV4cCI6MTk4Nzg5OTY5MH0.3J6Dp-a-EIUqw8UnqwHO_1s4gZuIZBo2_O4zy9oVD-w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
});