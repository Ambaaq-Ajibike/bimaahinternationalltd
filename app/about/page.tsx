import About from '@/components/About';
import { getAboutContent } from '@/lib/content';

export const metadata = {
  title: 'About — Bimaah International Ltd',
};

export default async function AboutPage() {
  const aboutData = await getAboutContent();
  return <About aboutData={aboutData} />;
}
