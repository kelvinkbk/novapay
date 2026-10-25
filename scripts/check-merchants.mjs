import { Database } from '../packages/db/src/database.js';
const db = new Database();
const tables = db.query("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
console.log('Tables:', tables.map(t => t.name).join(', '));

// Check VPAs
try {
  const vpas = db.query('SELECT * FROM vpa_slots LIMIT 5');
  console.log('VPAs:', JSON.stringify(vpas, null, 2));
} catch(e) { console.log('vpa_slots error:', e.message); }

// Check devices
try {
  const devices = db.query('SELECT id, status, publicKey FROM devices LIMIT 5');
  console.log('Devices:', JSON.stringify(devices, null, 2));
} catch(e) { console.log('devices error:', e.message); }

// Check recent payments
try {
  const payments = db.query('SELECT id, orderId, status, amount, deviceId FROM payments ORDER BY createdAt DESC LIMIT 5');
  console.log('\nRecent Payments:', JSON.stringify(payments, null, 2));
} catch(e) { console.log('payments error:', e.message); }
