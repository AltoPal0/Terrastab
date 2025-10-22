// Test the calculate-quote Edge Function directly

const SUPABASE_URL = 'https://sddrgyovjahxigysblra.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHJneW92amFoeGlneXNibHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NTIxOTQsImV4cCI6MjA3NDEyODE5NH0.CYVUu68HxPYQ70Lh7lW9VY9aNmSE3ksgSxjb-sbVpqU';

const testPayload = {
  risk_level: 'faible',
  rule_set_version: 'v1.0-survey-light',
  answers: {
    bloc00_housing_type: 'Maison mitoyenne',
    bloc02_is_ground_floor: true,
    bloc10_has_basement: false,
    bloc20_construction_year: 1995,
    bloc30_surface_m2: 150,
    bloc40_walls_without_terrace: 2,
    bloc50_green_zones: 1,
    bloc50_green_zones_monitored: true,
    bloc70_extensions: 0
  },
  address: '123 Test Street, Paris',
  user_id: null
};

async function testEdgeFunction() {
  console.log('Testing calculate-quote Edge Function...');
  console.log('Payload:', JSON.stringify(testPayload, null, 2));

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/calculate-quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify(testPayload)
    });

    console.log('\nResponse status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('\nResponse body (raw):', responseText);

    if (response.ok) {
      try {
        const data = JSON.parse(responseText);
        console.log('\nParsed response:', JSON.stringify(data, null, 2));
      } catch (e) {
        console.log('Could not parse as JSON');
      }
    } else {
      console.error('\n❌ Edge Function returned error status:', response.status);
      try {
        const errorData = JSON.parse(responseText);
        console.error('Error details:', JSON.stringify(errorData, null, 2));
      } catch (e) {
        console.error('Error response (not JSON):', responseText);
      }
    }
  } catch (error) {
    console.error('\n❌ Network error:', error.message);
    console.error('Full error:', error);
  }
}

testEdgeFunction();
