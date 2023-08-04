
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://azejsakbrqbkncyvhprk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZWpzYWticnFia25jeXZocHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5MDM4MjEsImV4cCI6MjAwNjQ3OTgyMX0.wtoDHSrZ20mPhMGwvPLZBtskGweVHL5X_FwXET6CcnE";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;