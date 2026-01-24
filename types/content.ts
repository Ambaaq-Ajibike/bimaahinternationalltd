// Content management types
export interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  address: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  updatedAt: Date;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  items?: string[];
  order: number;
}

export interface HeroContent {
  id: string;
  heading: string;
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  updatedAt: Date;
}

export interface AboutContent {
  id: string;
  title: string;
  description: string;
  updatedAt: Date;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  order: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface SocialLinks {
  id: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  updatedAt: Date;
}

export interface CompanyInfo {
  id: string;
  name: string;
  registrationNumber: string;
  iaaNumber: string;
  tagline: string;
  updatedAt: Date;
}
