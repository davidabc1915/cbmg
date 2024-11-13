import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wbtvdswgupknjclrlzzq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidHZkc3dndXBrbmpjbHJsenpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNjM0MzYsImV4cCI6MjA0NjkzOTQzNn0.DgEpQED0RnlMa5QhLsMh6KCXwvfRaJc4lhc9q_MY8pM';

export const supabase = createClient(supabaseUrl, supabaseKey);