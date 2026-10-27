const assert = require('assert');
const { extractRecords, filterRecords, toggleRecord, countOpen } = require('./src/logic.cjs');
const recs = extractRecords(require('./src/sampleData.json'));

assert.strictEqual(recs.length, 3);                          console.log('B1 PASS  loaded 3 tickets (expected 3)');
assert.strictEqual(filterRecords(recs, 'WIFI').length, 1);   console.log('B2 PASS  search "WIFI" -> "WiFi access" (1 match)');
assert.strictEqual(filterRecords(recs, 'printer')[0].id, 's2'); console.log('B2 PASS  search "printer" -> "Printer setup"');
const t = toggleRecord(recs, 's1');
assert.strictEqual(t[0].status, 'done');                     console.log('B3 PASS  s1 open -> done');
assert.strictEqual(t[1].status, recs[1].status);
assert.strictEqual(t[2].status, recs[2].status);             console.log('B3 PASS  s2, s3 unchanged');
assert.strictEqual(recs[0].status, 'open');                  console.log('B3 PASS  original array not mutated');
assert.strictEqual(toggleRecord(t, 's1')[0].status, 'open'); console.log('B3 PASS  toggles back done -> open');
console.log('Open count shown by unfixed countOpen on load: ' + countOpen(recs) + ' / 3 (correct value is 2 / 3 -> defect for C3)');
console.log('Service Tickets: all checks passed');
