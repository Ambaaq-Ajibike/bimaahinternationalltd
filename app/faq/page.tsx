import FAQ from '@/components/FAQ';
import { getFAQs } from '@/lib/content';

export const metadata = {
  title: 'FAQ — Bimaah International Ltd',
};

export default async function FAQPage() {
  const faqs = await getFAQs();
  return <FAQ faqs={faqs} />;
}
