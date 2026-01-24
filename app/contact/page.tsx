import Contact from '@/components/Contact';
import { getContactInfo } from '@/lib/content';

export const metadata = {
  title: 'Contact — Bimaah International Ltd',
};

export default async function ContactPage() {
  const contactInfo = await getContactInfo();
  return <Contact contactInfo={contactInfo} />;
}
