const assert = require('assert');
const { extractRecords, filterRecords, toggleRecord, countOpen } = require('./src/logic.cjs');
const recs = extractRecords(require('./src/sampleData.json'));

assert.strictEqual(recs.length, 3);                       console.log('A1 PASS  loaded 3 tasks (expected 3)');
assert.strictEqual(filterRecords(recs, 'LIB').length, 1); console.log('A2 PASS  search "LIB" -> "Library return" (1 match)');
assert.strictEqual(filterRecords(recs, 'lab')[0].id, 't2'); console.log('A2 PASS  search "lab" -> "Lab booking"');
const t = toggleRecord(recs, 't1');
assert.strictEqual(t[0].status, 'done');                  console.log('A3 PASS  t1 open -> done');
assert.strictEqual(t[1].status, recs[1].status);
assert.strictEqual(t[2].status, recs[2].status);          console.log('A3 PASS  t2, t3 unchanged');
assert.strictEqual(recs[0].status, 'open');               console.log('A3 PASS  original array not mutated');
assert.strictEqual(toggleRecord(t, 't1')[0].status, 'open'); console.log('A3 PASS  toggles back done -> open');
assert.strictEqual(countOpen(recs), 2);                   console.log('A4 PASS  open count = 2 / 3 on load');
assert.strictEqual(countOpen(t), 1);                      console.log('A4 PASS  open count = 1 / 3 after toggling t1');
console.log('Campus Tasks: all checks passed');
