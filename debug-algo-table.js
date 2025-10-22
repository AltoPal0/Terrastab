import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sddrgyovjahxigysblra.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHJneW92amFoeGlneXNibHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NTIxOTQsImV4cCI6MjA3NDEyODE5NH0.CYVUu68HxPYQ70Lh7lW9VY9aNmSE3ksgSxjb-sbVpqU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugAlgoTable() {
  console.log('=== Step 1: List all tables ===');
  const { data: tables, error: tablesError } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public');

  if (tablesError) {
    console.error('Error listing tables:', tablesError);
  } else {
    console.log('Tables:', tables);
  }

  console.log('\n=== Step 2: Check algo_table schema ===');
  const { data: columns, error: columnsError } = await supabase.rpc('get_table_columns', { table_name: 'algo_table' });

  if (columnsError) {
    console.log('Cannot use RPC, trying direct query...');
    // Try a simple select to see what columns exist
    const { data: sample, error: sampleError } = await supabase
      .from('algo_table')
      .select('*')
      .limit(1);

    if (sampleError) {
      console.error('Error querying algo_table:', sampleError);
    } else {
      console.log('Sample row from algo_table:', sample);
      if (sample && sample.length > 0) {
        console.log('Columns:', Object.keys(sample[0]));
      }
    }
  } else {
    console.log('Columns:', columns);
  }

  console.log('\n=== Step 3: Count rows in algo_table ===');
  const { count, error: countError } = await supabase
    .from('algo_table')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('Error counting rows:', countError);
  } else {
    console.log('Total rows in algo_table:', count);
  }

  console.log('\n=== Step 4: Try the exact query from Edge Function ===');
  const riskLevelNumber = 1; // faible
  const rule_set_version = 'v1.0-survey-light';

  const { data: algoRules, error: algoError } = await supabase
    .from('algo_table')
    .select('*')
    .eq('rule_set_version', rule_set_version)
    .contains('risk_levels', [riskLevelNumber])
    .order('bloc', { ascending: true });

  if (algoError) {
    console.error('ERROR querying with risk_levels:', algoError);
    console.error('Full error details:', JSON.stringify(algoError, null, 2));
  } else {
    console.log('Success! Found rules:', algoRules?.length);
    console.log('First rule:', algoRules?.[0]);
  }

  console.log('\n=== Step 5: Try without risk_levels filter ===');
  const { data: algoRules2, error: algoError2 } = await supabase
    .from('algo_table')
    .select('*')
    .eq('rule_set_version', rule_set_version)
    .order('bloc', { ascending: true });

  if (algoError2) {
    console.error('ERROR querying without risk_levels:', algoError2);
  } else {
    console.log('Success! Found rules:', algoRules2?.length);
    console.log('First rule:', algoRules2?.[0]);
  }

  console.log('\n=== Step 6: Try with v1.0 version ===');
  const { data: algoRules3, error: algoError3 } = await supabase
    .from('algo_table')
    .select('*')
    .eq('rule_set_version', 'v1.0')
    .limit(5);

  if (algoError3) {
    console.error('ERROR querying v1.0:', algoError3);
  } else {
    console.log('Success! Found v1.0 rules:', algoRules3?.length);
    console.log('Sample rules:', algoRules3);
  }
}

debugAlgoTable().catch(console.error);
