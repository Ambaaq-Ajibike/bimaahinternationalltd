// Seed Firestore with initial site content for Bimaah International
// Usage: node scripts/seed.js
// Reads from .env file automatically

require('dotenv').config();
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
}

function init() {
  if (getApps().length) return getFirestore();
  const serviceAccountJson = requireEnv('FIREBASE_SERVICE_ACCOUNT_KEY');
  const credential = cert(JSON.parse(serviceAccountJson));
  const app = initializeApp({ credential });
  return getFirestore(app);
}

async function seed(db) {
  const hero = {
    heading: 'Trusted Immigration & Advisory Services',
    subtext:
      'Expert support for visas, appeals, benefits and legal documentation — clear guidance at every step so you can move forward with confidence.',
    ctaPrimary: 'Book a Consultation',
    ctaSecondary: 'View Services',
    updatedAt: new Date(),
  };

  const contact = {
    phone: '03334040491',
    email: 'info@bimaahinternationalltd.com',
    address: '10 Toronto Road, Tilbury, RM18 7RL United Kingdom',
    instagram: 'https://www.instagram.com/bimaah2017?igsh=N3pyMmh2Y3J0Mmxx&utm_source=qr',
    facebook: 'https://web.facebook.com/bimaahinternational',
    tiktok: 'https://www.tiktok.com/@bimaahinternational?_r=1&_t=ZN-934cAFesF1i',
    updatedAt: new Date(),
  };

  const services = [
    {
      title: 'Immigration Advice',
      description: 'Expert guidance through complex immigration process with compassion and clarity',
      items: [
        'Visa applications and appeals',
        'EU settlement scheme guidance',
        'Indefinite leave to remain',
        'Family and private life visa',
        'Visitor visa support',
      ],
      order: 0,
    },
    {
      title: 'Benefits and Welfare Support',
      description: 'Comprehensive support navigating benefits systems with expertise and advocacy',
      items: [
        'Universal credit guidance',
        'PIP and ESA guidance',
        'Gateway assessments',
        'Appeals support',
        'Fair treatment advocacy',
      ],
      order: 1,
    },
  ];

  const faqs = [
    {
      question: 'What services does Bimaah International Ltd offer?',
      answer:
        'We provide free, accessible support in: Immigration advice and document preparation; Benefits applications and appeals (e.g. Universal Credit, PIP); Legal drafting (e.g. flexible working requests); Advocacy for fair treatment in employment.',
      order: 0,
    },
    {
      question: 'Who can access your services?',
      answer:
        'Our services are open to all, especially migrants, vulnerable individuals, and those facing financial hardship. We believe everyone deserves dignified, professional support—regardless of background or income.',
      order: 1,
    },
    {
      question: 'Do I need to pay for a consultation?',
      answer:
        'No. We offer free initial consultations and aim to keep our services accessible. If a case requires specialist legal input or external referrals, we\'ll explain any potential costs upfront.',
      order: 2,
    },
    {
      question: 'How do I book an appointment?',
      answer:
        'You can book online using our Booking Form, call us directly, or email us. We offer phone, video, and in-person consultations (subject to availability). We\'ll always try to accommodate your preferred method and time.',
      order: 3,
    },
    {
      question: 'What documents should I bring to my appointment?',
      answer:
        'Depending on your issue, we may ask for: ID and immigration documents; Benefit letters or decision notices; Any correspondence related to your case. Don\'t worry—we\'ll guide you through what\'s needed.',
      order: 4,
    },
    {
      question: 'Can you help me write legal letters or fill out forms?',
      answer:
        'Yes. We specialize in drafting clear, assertive documents including: Flexible working requests; Immigration representations; Benefits appeals. We\'ll work with you to ensure your voice is heard.',
      order: 5,
    },
    {
      question: 'Do you offer support in other languages?',
      answer:
        'We aim to be inclusive. If you need translation or interpretation support, please let us know when booking—we\'ll do our best to accommodate.',
      order: 6,
    },
    {
      question: 'Is my information kept confidential?',
      answer:
        'Absolutely. We treat all client information with the highest level of confidentiality inline with Immigration Advice Authority code of standards.',
      order: 7,
    },
    {
      question: 'What if I need urgent help?',
      answer:
        'If your situation is urgent—such as risk of eviction, loss of benefits, or immigration deadlines—please contact us directly. We\'ll prioritize urgent cases wherever possible.',
      order: 8,
    },
    {
      question: 'How can I support your work?',
      answer:
        'We welcome volunteers, referrals, and donations to help us continue offering free services. You can also share our resources or attend one of our community workshops.',
      order: 9,
    },
  ];

  const testimonials = [
    {
      name: 'Fatima A.',
      role: 'London',
      content:
        'Olabisi was a lifeline during my immigration process. She explained everything clearly, treated me with respect, and made me feel like I wasn\'t alone. I now have my visa—and my dignity intact.',
      rating: 5,
      order: 0,
    },
    {
      name: 'Modupe B.',
      role: 'Grays',
      content:
        'I was overwhelmed trying to apply for Universal Credit and PIP. Bimaah International didn\'t just help me fill out forms—they advocated for me when I felt unheard. I\'m so grateful.',
      rating: 5,
      order: 1,
    },
    {
      name: 'Amina R.',
      role: 'Tilbury',
      content:
        'Professional, empathetic, and thorough. Olabisi helped me apply for visiting visa for my mum after many refusal. Her legal letters were spot-on, and her support was unwavering.',
      rating: 5,
      order: 2,
    },
    {
      name: 'Muheez Adegoke',
      role: 'Lagos Nigeria',
      content:
        'I attended one of Olabisi\'s community workshops and left feeling empowered. She breaks down complex systems in a way that makes sense—and she genuinely cares.',
      rating: 5,
      order: 3,
    },
    {
      name: 'Emmanuel O.',
      role: 'Barking',
      content:
        'I didn\'t think I could afford legal advice, but Bimaah International offered free guidance that changed my life. Their commitment to accessibility is real.',
      rating: 5,
      order: 4,
    },
  ];

  // Write hero/contact docs
  await db.collection('content').doc('hero').set(hero, { merge: true });
  await db.collection('content').doc('contact').set(contact, { merge: true });

  // Replace services collection
  const servicesCol = db.collection('services');
  const servicesExisting = await servicesCol.listDocuments();
  await Promise.all(servicesExisting.map((d) => d.delete()));
  await Promise.all(services.map((svc) => servicesCol.add(svc)));

  // Replace faqs collection
  const faqsCol = db.collection('faqs');
  const faqsExisting = await faqsCol.listDocuments();
  await Promise.all(faqsExisting.map((d) => d.delete()));
  await Promise.all(faqs.map((faq) => faqsCol.add(faq)));

  // Replace testimonials collection
  const testimonialsCol = db.collection('testimonials');
  const testimonialsExisting = await testimonialsCol.listDocuments();
  await Promise.all(testimonialsExisting.map((d) => d.delete()));
  await Promise.all(testimonials.map((t) => testimonialsCol.add(t)));
}

async function main() {
  const db = init();
  await seed(db);
  console.log('Seed complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
