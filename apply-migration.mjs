import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sddrgyovjahxigysblra.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHJneW92amFoeGlneXNibHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NTIxOTQsImV4cCI6MjA3NDEyODE5NH0.CYVUu68HxPYQ70Lh7lW9VY9aNmSE3ksgSxjb-sbVpqU'

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('Testing current constraint...')

// Test with the old format - should work
const testOld = await supabase.from('results').select('id').eq('rule_set_version', 'v1.0-survey-light').limit(1)
console.log('Current records with v1.0-survey-light:', testOld.data?.length || 0)

console.log('\n⚠️  MANUAL MIGRATION REQUIRED')
console.log('Please run this SQL in your Supabase SQL Editor:\n')
console.log('ALTER TABLE results DROP CONSTRAINT IF EXISTS valid_rule_set_version;')
console.log(`ALTER TABLE results ADD CONSTRAINT valid_rule_set_version CHECK (rule_set_version ~ '^v[0-9]+\\.[0-9]+(-[a-z0-9\\-]+)?$');`)
console.log('\nAfter running the SQL, test the calculate-quote function again.')
