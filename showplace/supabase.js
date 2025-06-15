import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const SUPABASE_URL = "https://gcupjyukfhhebbxfcuiv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjdXBqeXVrZmhoZWJieGZjdWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0ODI4NzMsImV4cCI6MjA1ODA1ODg3M30.tqO2855TMloVVEoGgPjz_UrI96PWvSR0MkW-kwXJTu8";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  realtime: { enabled: false },  // <- importante DESABILITAR realtime
  auth: {
    storage: {
      getItem: SecureStore.getItemAsync,
      setItem: SecureStore.setItemAsync,
      removeItem: SecureStore.deleteItemAsync,
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;