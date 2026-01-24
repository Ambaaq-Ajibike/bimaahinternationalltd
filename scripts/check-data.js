// Quick script to check what's in Firestore
require('dotenv').config();
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

function init() {
  if (getApps().length) return getFirestore();
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountJson) throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_KEY');
  const credential = cert(JSON.parse(serviceAccountJson));
  const app = initializeApp({ credential });
  return getFirestore(app);
}

async function check() {
  const db = init();
  
  console.log('\n=== HERO ===');
  const hero = await db.collection('content').doc('hero').get();
  console.log(hero.exists ? hero.data() : 'NOT FOUND');
  
  console.log('\n=== CONTACT ===');
  const contact = await db.collection('content').doc('contact').get();
  console.log(contact.exists ? contact.data() : 'NOT FOUND');
  
  console.log('\n=== SERVICES ===');
  const services = await db.collection('services').get();
  console.log(`Found ${services.size} services:`);
  services.forEach(doc => console.log(doc.id, doc.data()));
  
  console.log('\n=== FAQS ===');
  const faqs = await db.collection('faqs').get();
  console.log(`Found ${faqs.size} FAQs:`);
  faqs.forEach(doc => console.log(doc.id, doc.data()));
  
  console.log('\n=== TESTIMONIALS ===');
  const testimonials = await db.collection('testimonials').get();
  console.log(`Found ${testimonials.size} testimonials:`);
  testimonials.forEach(doc => console.log(doc.id, doc.data()));
}

check().catch(console.error).finally(() => process.exit(0));
