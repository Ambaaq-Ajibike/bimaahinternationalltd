import { adminDb } from './firebase/admin';
import {
  ContactInfo,
  FAQItem,
  HeroContent,
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

const contactFallback: ContactInfo = {
  id: 'contact',
  phone: '03334040491',
  email: 'info@bimaahinternationalltd.com',
  address: '10 Toronto Road, Tilbury, RM18 7RL United Kingdom',
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
