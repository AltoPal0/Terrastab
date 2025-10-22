// Test script to debug calculate-quote 500 error
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://sddrgyovjahxigysblra.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHJneW92amFoeGlneXNibHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MzkyMDMsImV4cCI6MjA0MjUxNTIwM30.3J5tFptIW5U7xGZqGbwqm3GcpqYQi7PxRKu2IzHglMw'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Test data that should work
const testRequest = {
  risk_level: 'faible',
  rule_set_version: 'v1.0-survey-light',
  answers: {
    bloc00_housing_type: 'Maison mitoyenne',
    bloc02_is_ground_floor: true,
    bloc10_has_basement: false,
    bloc20_construction_year: 1990,
    bloc30_surface_m2: 150,
    bloc40_walls_without_terrace: 2,
    bloc50_green_zones: 1,
    bloc50_green_zones_monitored: true,
    bloc70_extensions: 0,
  },
  address: '123 Test Street, Paris',
}

console.log('Testing calculate-quote Edge Function...')
console.log('Request payload:', JSON.stringify(testRequest, null, 2))

try {
  const { data, error } = await supabase.functions.invoke('calculate-quote', {
    body: testRequest,
  })

  if (error) {
    console.error('\n❌ ERROR from Edge Function:')
    console.error('Status:', error.status)
    console.error('Message:', error.message)
    console.error('Context:', error.context)
    console.error('Full error:', JSON.stringify(error, null, 2))
  } else {
    console.log('\n✅ SUCCESS:')
    console.log(JSON.stringify(data, null, 2))
  }
} catch (err) {
  console.error('\n❌ EXCEPTION:', err)
}
