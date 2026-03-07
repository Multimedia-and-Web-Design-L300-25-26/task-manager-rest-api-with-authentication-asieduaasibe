import crypto from 'crypto';

// Generate a 64-character random hex string
const secret = crypto.randomBytes(32).toString('hex');
console.log('\n Your JWT Secret (copy this):\n');
console.log(secret);
console.log('\n Add this to your .env file as:\n');
console.log(`JWT_SECRET=${secret}\n`);