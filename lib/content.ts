import { adminDb } from './firebase/admin';
import {
  ContactInfo,
  FAQItem,
  HeroContent,
  PrivacyData,
  ServiceItem,
  TestimonialItem,
} from '@/types/content';

const heroFallback: HeroContent = {
  id: 'hero',
  heading: 'Trusted Immigration & Advisory Services',
  subtext:
    'Expert support for visas, appeals, benefits and legal documentation — clear guidance at every step so you can move forward with confidence.',
  ctaPrimary: 'Book a Consultation',
  ctaSecondary: 'View Services',
  updatedAt: new Date(0),
};

const homeFallback = {
  heading: 'Trusted Immigration & Advisory Services',
  subtext: 'Expert support for visas, appeals, benefits and legal documentation — clear guidance at every step so you can move forward with confidence.',
  ctaPrimary: 'Book a Consultation',
  ctaSecondary: 'View Services',
  servicesTitle: 'OUR SERVICES',
  servicesDescription: 'From complex visa applications and immigration appeals to benefits assessments and welfare support, we provide expert legal documentation and advocacy services tailored to your unique circumstances. Our experienced team ensures you understand every stage of the process, empowering you with the clarity and confidence needed to navigate challenging situations with dignity and assurance.',
  callUsTitle: 'CALL US FOR ADVICE',
  callUsText: 'Call us now on our phone number or send us an e-mail to get in touch.',
};

const contactFallback: ContactInfo = {
  id: 'contact',
  phone: '03334040491',
  email: 'info@bimaahinternationalltd.com',
  address: '10 Toronto Road, Tilbury, RM18 7RL United Kingdom',
  phoneAvailability: 'Available Mon-Fri',
  openingHours: 'Mon-Sat: 10:00am - 6:00pm\nSun: 2:00pm - 6:00pm',
  updatedAt: new Date(0),
};

const socialFallback = {
  instagram: 'https://www.instagram.com/bimaah2017?igsh=N3pyMmh2Y3J0Mmxx&utm_source=qr',
  facebook: 'https://web.facebook.com/bimaahinternational',
  tiktok: 'https://www.tiktok.com/@bimaahinternational?_r=1&_t=ZN-934cAFesF1i',
};

function safeDate(value: unknown) {
  if (value instanceof Date) return value;
  // Firestore Timestamp has toDate
  if (value && typeof value === 'object' && 'toDate' in (value as any)) {
    try {
      return (value as any).toDate();
    } catch {
      return new Date(0);
    }
  }
  return new Date(0);
}

export async function getHeroContent(): Promise<HeroContent> {
  try {
    const snap = await adminDb.collection('content').doc('hero').get();
    if (!snap.exists) return heroFallback;
    const data = snap.data();
    if (!data) return heroFallback;
    return {
      id: 'hero',
      heading: data.heading ?? heroFallback.heading,
      subtext: data.subtext ?? heroFallback.subtext,
      ctaPrimary: data.ctaPrimary ?? heroFallback.ctaPrimary,
      ctaSecondary: data.ctaSecondary ?? heroFallback.ctaSecondary,
      updatedAt: safeDate(data.updatedAt),
    };
  } catch (error) {
    console.error('Error fetching hero content', error);
    return heroFallback;
  }
}

export async function getContactInfo(): Promise<ContactInfo> {
  try {
    const snap = await adminDb.collection('content').doc('contact').get();
    if (!snap.exists) return { ...contactFallback, ...socialFallback };
    const data = snap.data();
    if (!data) return { ...contactFallback, ...socialFallback };

    return {
      id: 'contact',
      phone: data.phone ?? contactFallback.phone,
      email: data.email ?? contactFallback.email,
      address: data.address ?? contactFallback.address,
      phoneAvailability: data.phoneAvailability ?? contactFallback.phoneAvailability,
      openingHours: data.openingHours ?? contactFallback.openingHours,
      instagram: data.instagram ?? socialFallback.instagram,
      facebook: data.facebook ?? socialFallback.facebook,
      tiktok: data.tiktok ?? socialFallback.tiktok,
      updatedAt: safeDate(data.updatedAt),
    };
  } catch (error) {
    console.error('Error fetching contact info', error);
    return { ...contactFallback, ...socialFallback };
  }
}

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const snap = await adminDb.collection('services').get();
    const services = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title ?? 'Untitled Service',
        description: data.description ?? '',
        items: Array.isArray(data.items) ? data.items : [],
        order: typeof data.order === 'number' ? data.order : 0,
      } satisfies ServiceItem;
    });

    return services.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching services', error);
    return [];
  }
}

export async function getFAQs(): Promise<FAQItem[]> {
  try {
    const snap = await adminDb.collection('faqs').get();
    const faqs = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        question: data.question ?? 'Untitled question',
        answer: data.answer ?? '',
        order: typeof data.order === 'number' ? data.order : 0,
      } satisfies FAQItem;
    });

    return faqs.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching FAQs', error);
    return [];
  }
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const snap = await adminDb.collection('testimonials').get();
    const testimonials = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name ?? 'Anonymous',
        role: data.role ?? '',
        content: data.content ?? '',
        rating: typeof data.rating === 'number' ? data.rating : 5,
        order: typeof data.order === 'number' ? data.order : 0,
      } satisfies TestimonialItem;
    });

    return testimonials.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error fetching testimonials', error);
    return [];
  }
}

const aboutFallback = {
  title: 'About Us',
  paragraph1: 'Navigating immigration, benefits, and legal processes can be challenging—especially when personal circumstances or systemic barriers make the journey even harder. Bimaah International Ltd is here to bring clarity, fairness, and accessible support to everyone who needs it.',
  paragraph2: 'Our work is grounded in dignity, justice, and genuine care. With extensive experience in immigration advice, benefits guidance, legal documentation, and community advocacy, we provide strategic expertise delivered with empathy and respect.',
  paragraph3: 'Whether you\'re applying for a visa, seeking support with benefits, or preparing essential legal documents, you can expect clear, professional guidance designed to empower you at every step.',
  valuesTitle: 'Our Values',
  values: [
    {
      title: 'Accessibility for all',
      description: 'We ensure our services are available to everyone, regardless of financial circumstances.',
    },
    {
      title: 'Professional integrity',
      description: 'We maintain the highest standards in all our work.',
    },
    {
      title: 'Empathetic advocacy',
      description: 'We listen, understand, and advocate with compassion.',
    },
    {
      title: 'Community empowerment',
      description: 'We uplift voices and build stronger communities.',
    },
  ],
  closingStatement: '"We don\'t just offer services—we build trust, uplift voices, and stand beside you every step of the way."',
};

export async function getAboutContent() {
  try {
    const snap = await adminDb.collection('content').doc('about').get();
    if (!snap.exists) return aboutFallback;
    const data = snap.data();
    if (!data) return aboutFallback;
    
    return {
      title: data.title ?? aboutFallback.title,
      paragraph1: data.paragraph1 ?? aboutFallback.paragraph1,
      paragraph2: data.paragraph2 ?? aboutFallback.paragraph2,
      paragraph3: data.paragraph3 ?? aboutFallback.paragraph3,
      valuesTitle: data.valuesTitle ?? aboutFallback.valuesTitle,
      values: Array.isArray(data.values) ? data.values : aboutFallback.values,
      closingStatement: data.closingStatement ?? aboutFallback.closingStatement,
    };
  } catch (error) {
    console.error('Error fetching about content', error);
    return aboutFallback;
  }
}

export async function getHomeContent() {
  try {
    const snap = await adminDb.collection('content').doc('home').get();
    if (!snap.exists) return homeFallback;
    const data = snap.data();
    if (!data) return homeFallback;
    
    return {
      heading: data.heading ?? homeFallback.heading,
      subtext: data.subtext ?? homeFallback.subtext,
      ctaPrimary: data.ctaPrimary ?? homeFallback.ctaPrimary,
      ctaSecondary: data.ctaSecondary ?? homeFallback.ctaSecondary,
      servicesTitle: data.servicesTitle ?? homeFallback.servicesTitle,
      servicesDescription: data.servicesDescription ?? homeFallback.servicesDescription,
      callUsTitle: data.callUsTitle ?? homeFallback.callUsTitle,
      callUsText: data.callUsText ?? homeFallback.callUsText,
    };
  } catch (error) {
    console.error('Error fetching home content', error);
    return homeFallback;
  }
}

const privacyFallback: PrivacyData = {
  lastUpdated: '18/01/2026',
  companyRegistration: '16557180',
  whoWeAre: 'Bimaah International Ltd is registered in England and Wales, company registration number 16557180. Our business address is 10 Toronto Road, Tilbury, RM18 7RL United Kingdom. We provide immigration advisory services, legal drafting, benefits guidance, training, and community support services.',
  address: '10 Toronto Road, Tilbury, RM18 7RL United Kingdom',
  contactPhone: '03334040491',
  contactEmail: 'info@bimaahinternationalltd.com',
  whatWeCollectInfo: 'We collect personal identification data (name, date of birth, nationality, passport details), contact information (address, email, phone), immigration & legal information (visa history, case notes), financial & employment information (income, benefits), sensitive data (with explicit consent), and technical data from our website.',
  collectingDataInfo: 'We collect personal data directly from you through consultations, online forms, documents you submit, and third parties with your consent. We may also gather publicly available information relevant to your case.',
  whyWeUseDataInfo: 'We process your personal data to provide immigration and advisory services, prepare and submit applications, communicate about your case, comply with legal obligations, maintain records, and improve our services.',
  legalBasisInfo: 'We rely on consent when you agree to us handling your data, contract to deliver requested services, legal obligation for compliance with UK law, and legitimate interest for efficient service delivery. For special category data, we rely on explicit consent or where processing is necessary for legal claims.',
  dataStorageInfo: 'We use encrypted digital storage, password-protected files, restricted staff access, and secure document disposal. Regular data protection training ensures ongoing compliance.',
  dataRetentionInfo: 'We retain your data for as long as necessary—typically 6 years after your case closes, unless legal obligations require otherwise.',
  sharingDataIntro: 'We do not sell or trade your personal information.',
  sharingDataInfo: 'We may share your data with the Home Office, solicitors or barristers (with consent), local authorities, professional partners assisting with your case, and regulators/law enforcement when legally required. All third parties comply with UK GDPR.',
  yourRightsInfo: 'You have the right to access, correct, delete, restrict, object to processing, withdraw consent, and request portability of your data. Contact us to exercise these rights.',
  cookiesInfo: 'If you use our website, we may use cookies to improve user experience. You can disable cookies in your browser settings.',
  internationalTransfersInfo: 'We do not routinely transfer your data outside the UK. If necessary, appropriate safeguards are in place.',
  complaintsInfo: 'Contact us first to resolve concerns about data handling.',
  complaintsEmail1: 'bimaahltd@gmail.com',
  complaintsEmail2: 'info@bimaahinternationalltd.com',
  iaaPortalUrl: 'https://portal.oisc.gov.uk/s/complaints',
  iaaEmail: 'info@immigrationadviceauthority.gov.uk',
  updatesInfo: 'We may update this Privacy Policy from time to time. The latest version will always be available on request or on our website.',
};

export async function getPrivacyContent(): Promise<PrivacyData> {
  try {
    const snap = await adminDb.collection('content').doc('privacy').get();
    if (!snap.exists) return privacyFallback;
    const data = snap.data();
    if (!data) return privacyFallback;
    
    return {
      lastUpdated: data.lastUpdated ?? privacyFallback.lastUpdated,
      companyRegistration: data.companyRegistration ?? privacyFallback.companyRegistration,
      whoWeAre: data.whoWeAre ?? privacyFallback.whoWeAre,
      address: data.address ?? privacyFallback.address,
      contactPhone: data.contactPhone ?? privacyFallback.contactPhone,
      contactEmail: data.contactEmail ?? privacyFallback.contactEmail,
      whatWeCollectInfo: data.whatWeCollectInfo ?? privacyFallback.whatWeCollectInfo,
      collectingDataInfo: data.collectingDataInfo ?? privacyFallback.collectingDataInfo,
      whyWeUseDataInfo: data.whyWeUseDataInfo ?? privacyFallback.whyWeUseDataInfo,
      legalBasisInfo: data.legalBasisInfo ?? privacyFallback.legalBasisInfo,
      dataStorageInfo: data.dataStorageInfo ?? privacyFallback.dataStorageInfo,
      dataRetentionInfo: data.dataRetentionInfo ?? privacyFallback.dataRetentionInfo,
      sharingDataIntro: data.sharingDataIntro ?? privacyFallback.sharingDataIntro,
      sharingDataInfo: data.sharingDataInfo ?? privacyFallback.sharingDataInfo,
      yourRightsInfo: data.yourRightsInfo ?? privacyFallback.yourRightsInfo,
      cookiesInfo: data.cookiesInfo ?? privacyFallback.cookiesInfo,
      internationalTransfersInfo: data.internationalTransfersInfo ?? privacyFallback.internationalTransfersInfo,
      complaintsInfo: data.complaintsInfo ?? privacyFallback.complaintsInfo,
      complaintsEmail1: data.complaintsEmail1 ?? privacyFallback.complaintsEmail1,
      complaintsEmail2: data.complaintsEmail2 ?? privacyFallback.complaintsEmail2,
      iaaPortalUrl: data.iaaPortalUrl ?? privacyFallback.iaaPortalUrl,
      iaaEmail: data.iaaEmail ?? privacyFallback.iaaEmail,
      updatesInfo: data.updatesInfo ?? privacyFallback.updatesInfo,
    };
  } catch (error) {
    console.error('Error fetching privacy content', error);
    return privacyFallback;
  }
}
