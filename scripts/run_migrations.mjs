/**
 * VeriLex — Push SQL migrations ke Supabase
 * Usage:
 *   node scripts/run_migrations.mjs              — semua file
 *   node scripts/run_migrations.mjs elaborasi    — filter by name
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://iksfntkreujnsmwjkbfo.supabase.co';
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlrc2ZudGtyZXVqbnNtd2prYmZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTQ0MDc5NywiZXhwIjoyMTAxMDE2Nzk3fQ.axn6koUP__-DzJBy6KiUt855ulM4eaCjalhuk4HZxp4';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false }
});

// Execute raw SQL via Supabase's pg RPC (uses service_role)
async function execSQL(sql) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });
  return res;
}

// Split SQL preserving dollar-quoted blocks
function splitStatements(sql) {
  const statements = [];
  let current = '';
  let dollarDepth = 0;

  for (const line of sql.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('--')) { current += line + '\n'; continue; }
    // count $$ pairs
    const dollarMatches = (line.match(/\$\$/g) || []).length;
    if (dollarMatches % 2 !== 0) dollarDepth = dollarDepth === 0 ? 1 : 0;
    current += line + '\n';
    if (dollarDepth === 0 && trimmed.endsWith(';')) {
      const stmt = current.trim();
      if (stmt.length > 1) statements.push(stmt);
      current = '';
    }
  }
  if (current.trim().length > 1) statements.push(current.trim());
  return statements.filter(s => !s.startsWith('--') && s.length > 2);
}

const MIGRATIONS_DIR = join(process.cwd(), 'supabase/migrations');
const TARGET = process.argv[2]; // optional: filter by filename substring

const files = readdirSync(MIGRATIONS_DIR)
  .filter(f => f.endsWith('.sql') && (!TARGET || f.includes(TARGET)))
  .sort();

console.log(`\n🚀  VeriLex Migration Runner — ${files.length} file\n`);

for (const file of files) {
  process.stdout.write(`⏳  ${file} ... `);
  const sql = readFileSync(join(MIGRATIONS_DIR, file), 'utf-8');

  // Try via management API first (most reliable for DDL)
  try {
    const mgRes = await fetch(
      `https://api.supabase.com/v1/projects/iksfntkreujnsmwjkbfo/database/query`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SERVICE_KEY}`,
        },
        body: JSON.stringify({ query: sql }),
      }
    );

    if (mgRes.ok) {
      console.log('✅');
      continue;
    }

    const errBody = await mgRes.json().catch(() => ({}));
    const errMsg = errBody?.message || errBody?.error || JSON.stringify(errBody);

    // If management API fails, try statement by statement via pg client
    console.log(`⚠  mgmt API: ${errMsg.slice(0, 80)} — trying pg...`);

    const statements = splitStatements(sql);
    let failed = false;
    for (const stmt of statements) {
      const { error } = await supabase.rpc('exec_sql', { query: stmt }).maybeSingle();
      if (error && !error.message.includes('already exists') && !error.message.includes('does not exist')) {
        console.error(`\n   ❌  ${error.message.slice(0, 120)}`);
        failed = true;
        break;
      }
    }
    if (!failed) console.log('✅  (via pg fallback)');

  } catch (err) {
    console.error(`\n   ❌  ${err.message}`);
  }
}

// Verify
console.log('\n📊  Verifikasi data...');
const { data: maxims, error } = await supabase
  .from('maxims')
  .select('id, latin_phrase, status')
  .order('created_at', { ascending: false })
  .limit(10);

if (error) {
  console.error('❌  Query error:', error.message);
} else {
  console.log(`✅  ${maxims.length} maksim terbaru di DB:`);
  maxims.forEach(m => console.log(`   • [${m.status}] ${m.latin_phrase}`));
}
