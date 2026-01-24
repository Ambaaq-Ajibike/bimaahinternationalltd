import type { Metadata } from 'next';
import { getPrivacyContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bimaah International Ltd',
  description:
    'Learn how Bimaah International Ltd collects, uses, stores, and protects your personal data in line with UK GDPR and the Data Protection Act 2018.',
};

export default async function PrivacyPage() {
  const privacy = await getPrivacyContent();

  return (
    <main className="px-4 py-12 max-w-4xl mx-auto text-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1C478A] mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-8">Last updated: {privacy.lastUpdated}</p>

      <section className="space-y-4">
        <p>
          Bimaah International Ltd, is committed to protecting the privacy and personal data of every individual who engages with our services. We understand that clients trust us with sensitive information, and we take that responsibility seriously. This Privacy Policy explains how we collect, use, store, and protect your personal data in line with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and all applicable privacy laws.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">1. Who We Are</h2>
        <p>
          Bimaah International Ltd is registered in England and Wales, company registration number {privacy.companyRegistration}. Our business address is {privacy.address}. In this document Bimaah International Ltd maybe referred to as ("we", "our", "us"). We provide immigration advisory services, legal drafting, benefits guidance, training, and community support services.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">2. What Personal Data We Collect</h2>
        <p>{privacy.whatWeCollectInfo}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">3. How We Collect Your Data</h2>
        <p>{privacy.collectingDataInfo}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">4. Why We Use Your Data</h2>
        <p>{privacy.whyWeUseDataInfo}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">5. Legal Basis for Processing</h2>
        <p>{privacy.legalBasisInfo}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">6. How We Store and Protect Your Data</h2>
        <p>{privacy.dataStorageInfo}</p>
        <p className="mt-2">
          Data Retention: {privacy.dataRetentionInfo}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">7. Sharing Your Data</h2>
        <p>{privacy.sharingDataIntro}</p>
        <p className="mt-2">{privacy.sharingDataInfo}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">8. Your Rights</h2>
        <p>{privacy.yourRightsInfo}</p>
        <p className="mt-2">
          To exercise your rights, contact us at: <a className="text-[#1C478A] underline" href={`tel:${privacy.contactPhone}`}>{privacy.contactPhone}</a>, Email: <a className="text-[#1C478A] underline" href={`mailto:${privacy.contactEmail}`}>{privacy.contactEmail}</a>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">9. Cookies and Website Tracking</h2>
        <p>
          {privacy.cookiesInfo}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">10. International Transfers</h2>
        <p>
          {privacy.internationalTransfersInfo}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">11. Complaints</h2>
        <p>
          {privacy.complaintsInfo} You can contact us via <a className="text-[#1C478A] underline" href={`mailto:${privacy.complaintsEmail1}`}>{privacy.complaintsEmail1}</a> or <a className="text-[#1C478A] underline" href={`mailto:${privacy.complaintsEmail2}`}>{privacy.complaintsEmail2}</a>. We encourage you to contact us first so we can resolve the issue promptly. If we are unable to resolve matters to your satisfaction, you are entitled to contact the IAA at any time, through the Portal at{' '}
          <a className="text-[#1C478A] underline" href={privacy.iaaPortalUrl} target="_blank" rel="noopener noreferrer">{privacy.iaaPortalUrl}</a> or via email to <a className="text-[#1C478A] underline" href={`mailto:${privacy.iaaEmail}`}>{privacy.iaaEmail}</a>
        </p>
      </section>

      <section className="mt-8 mb-16">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">12. Updates to This Policy</h2>
        <p>
          {privacy.updatesInfo}
        </p>
      </section>
    </main>
  );
}
