// React Native debugging experiment — App B (Student)
// Pure domain functions are intentionally kept separate for reproducible unit testing.
function extractRecords(response) {
  const values = response?.data?.tickets; 
  return Array.isArray(values) ? values : [];
}
function filterRecords(records, query) {
  const q = String(query || '').trim().toLowerCase();
  return records.filter(item => String(item.subject || '').toLowerCase().includes(q)); 
}
function toggleRecord(records, id) {
  
  return records.map(item => item.id === id ? { ...item, status: item.status === 'open' ? 'done' : 'open' } : item);
}
function countOpen(records) {
 
  return records.filter(item => item.status === 'done').length;
}
module.exports = { extractRecords, filterRecords, toggleRecord, countOpen };
