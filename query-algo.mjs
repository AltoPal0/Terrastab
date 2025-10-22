import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sddrgyovjahxigysblra.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZHJneW92amFoeGlneXNibHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NTIxOTQsImV4cCI6MjA3NDEyODE5NH0.CYVUu68HxPYQ70Lh7lW9VY9aNmSE3ksgSxjb-sbVpqU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function queryAlgoTable() {
  console.log('Querying algo_table for all product versions...\n');

  // Query for all distinct rule_set_versions
  const { data: versions, error: versionError } = await supabase
    .from('algo_table')
    .select('rule_set_version')
    .order('rule_set_version');

  if (versionError) {
    console.error('Error fetching versions:', versionError);
    return;
  }

  const uniqueVersions = [...new Set(versions.map(v => v.rule_set_version))];
  console.log('Found versions:', uniqueVersions);
  console.log('\n' + '='.repeat(80) + '\n');

  // Query each version
  for (const version of uniqueVersions) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`PRODUCT VERSION: ${version}`);
    console.log('='.repeat(80) + '\n');

    const { data: rules, error: rulesError } = await supabase
      .from('algo_table')
      .select('*')
      .eq('rule_set_version', version)
      .order('bloc');

    if (rulesError) {
      console.error(`Error fetching rules for ${version}:`, rulesError);
      continue;
    }

    console.log(`Total rules: ${rules.length}\n`);

    // Group by bloc
    const rulesByBloc = rules.reduce((acc, rule) => {
      if (!acc[rule.bloc]) {
        acc[rule.bloc] = [];
      }
      acc[rule.bloc].push(rule);
      return acc;
    }, {});

    for (const [bloc, blocRules] of Object.entries(rulesByBloc)) {
      console.log(`\nBLOC ${bloc}: ${blocRules[0].question}`);
      console.log('-'.repeat(80));

      for (const rule of blocRules) {
        console.log(`  Condition: ${rule.condition}`);
        console.log(`    -> Sondes: ${rule.nbr_sonde}, Sondes doubles: ${rule.nbr_sonde_double}`);
        console.log(`    -> Note: ${rule.note}`);
        console.log('');
      }
    }
  }

  // Query price_book
  console.log('\n' + '='.repeat(80));
  console.log('PRICE_BOOK');
  console.log('='.repeat(80) + '\n');

  const { data: prices, error: priceError } = await supabase
    .from('price_book')
    .select('*')
    .order('rule_set_version, item_type');

  if (priceError) {
    console.error('Error fetching prices:', priceError);
  } else {
    for (const price of prices) {
      console.log(`${price.rule_set_version} - ${price.item_type}: ${price.unit_price} ${price.currency}`);
    }
  }
}

queryAlgoTable().catch(console.error);
