import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Bimaah International Ltd',
  description:
    'Learn how Bimaah International Ltd collects, uses, stores, and protects your personal data in line with UK GDPR and the Data Protection Act 2018.',
};

export default function PrivacyPage() {
  return (
    <main className="px-4 py-12 max-w-4xl mx-auto text-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1C478A] mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-600 mb-8">Last updated: 18/01/2026</p>

      <section className="space-y-4">
        <p>
          Bimaah International Ltd, is committed to protecting the privacy and personal data of every individual who engages with our services. We understand that clients trust us with sensitive information, and we take that responsibility seriously. This Privacy Policy explains how we collect, use, store, and protect your personal data in line with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and all applicable privacy laws.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">1. Who We Are</h2>
        <p>
          Bimaah International Ltd is registered in England and Wales, company registration number 16557180. Our business address is 10 Toronto Road, Tilbury, RM18 7RL United Kingdom. In this document Bimaah International Ltd maybe referred to as (“we”, “our”, “us”). We provide immigration advisory services, legal drafting, benefits guidance, training, and community support services.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">2. What Personal Data We Collect</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Personal Identification</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Full name</li>
              <li>Date of birth</li>
              <li>Gender</li>
              <li>Nationality</li>
              <li>Passport or ID details</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Contact Information</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Address</li>
              <li>Email</li>
              <li>Telephone number</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Immigration &amp; Legal Information</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Visa history</li>
              <li>Immigration status</li>
              <li>Supporting documents</li>
              <li>Case notes and correspondence</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Financial &amp; Employment Information</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Employment history</li>
              <li>Income details</li>
              <li>Benefits information</li>
              <li>Bank statements (where required for applications)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Sensitive (“Special Category”) Data</h3>
            <p>Only when necessary and with your explicit consent:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Health information</li>
              <li>Information relating to vulnerabilities</li>
              <li>Family circumstances</li>
              <li>Criminal convictions (if relevant to your case)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Technical Data (if using our website)</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Cookies and usage data</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">3. How We Collect Your Data</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Direct communication (email, phone, WhatsApp, in-person)</li>
          <li>Online forms or documents you submit</li>
          <li>Third parties with your consent (e.g., solicitors, local authorities)</li>
          <li>Publicly available sources (e.g., Home Office updates relevant to your case)</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">4. Why We Use Your Data</h2>
        <p>We process your personal data for the following purposes:</p>
        <ul className="list-disc ml-6 space-y-1 mt-2">
          <li>To provide immigration and advisory services</li>
          <li>To prepare and submit applications on your behalf</li>
          <li>To communicate with you about your case</li>
          <li>To comply with legal and regulatory obligations</li>
          <li>To maintain accurate records</li>
          <li>To improve our services and client experience</li>
        </ul>
        <p className="mt-2">We only collect information that is necessary and relevant to your case.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">5. Legal Basis for Processing</h2>
        <p>We rely on the following lawful bases:</p>
        <ul className="list-disc ml-6 space-y-1 mt-2">
          <li>Consent – when you agree to us handling your data</li>
          <li>Contract – to deliver the services you request</li>
          <li>Legal obligation – compliance with UK law and regulatory requirements</li>
          <li>Legitimate interest – ensuring efficient and effective service delivery</li>
        </ul>
        <p className="mt-2">
          For special category data, we rely on explicit consent or where processing is necessary for legal claims or substantial public interest.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">6. How We Store and Protect Your Data</h2>
        <p>We use secure systems and procedures to protect your information, including:</p>
        <ul className="list-disc ml-6 space-y-1 mt-2">
          <li>Encrypted digital storage</li>
          <li>Password-protected files</li>
          <li>Restricted staff access</li>
          <li>Secure disposal of documents</li>
          <li>Regular data protection training</li>
        </ul>
        <p className="mt-2">
          We retain your data only for as long as necessary—typically 6 years after your case is closed, unless legal obligations require otherwise.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">7. Sharing Your Data</h2>
        <p>We do not sell or trade your personal information.</p>
        <p className="mt-2">We may share your data with:</p>
        <ul className="list-disc ml-6 space-y-1 mt-2">
          <li>The Home Office</li>
          <li>Solicitors or barristers (with your consent)</li>
          <li>Local authorities or support agencies (where relevant)</li>
          <li>Professional partners assisting with your case</li>
          <li>Regulators or law enforcement when legally required</li>
        </ul>
        <p className="mt-2">All third parties must comply with UK GDPR and maintain confidentiality.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">8. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc ml-6 space-y-1 mt-2">
          <li>Access your personal data</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion (“right to be forgotten”)</li>
          <li>Restrict or object to processing</li>
          <li>Withdraw consent at any time</li>
          <li>Request data portability</li>
        </ul>
        <p className="mt-2">
          To exercise your rights, contact us at: <a className="text-[#1C478A] underline" href="tel:+4407903263491">+4407903263491</a>, Email: <a className="text-[#1C478A] underline" href="mailto:info@bimaahinternationalltd.com">info@bimaahinternationalltd.com</a>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">9. Cookies and Website Tracking</h2>
        <p>
          If you use our website, we may use cookies to improve user experience. You can disable cookies in your browser settings.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">10. International Transfers</h2>
        <p>
          We do not routinely transfer your data outside the UK. If this becomes necessary, we ensure appropriate safeguards are in place.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">11. Complaints</h2>
        <p>
          If you have concerns about how we handle your data, you can contact us via <a className="text-[#1C478A] underline" href="mailto:bimaahltd@gmail.com">bimaahltd@gmail.com</a> or <a className="text-[#1C478A] underline" href="mailto:info@bimaahinternationalltd.com">info@bimaahinternationalltd.com</a>. We encourage you to contact us first so we can resolve the issue promptly. If we are unable to resolve matters to your satisfaction, you are entitled to contact the IAA at any time, through the Portal at{' '}
          <a className="text-[#1C478A] underline" href="https://portal.oisc.gov.uk/s/complaints" target="_blank" rel="noopener noreferrer">https://portal.oisc.gov.uk/s/complaints</a> or via email to <a className="text-[#1C478A] underline" href="mailto:info@immigrationadviceauthority.gov.uk">info@immigrationadviceauthority.gov.uk</a>
        </p>
      </section>

      <section className="mt-8 mb-16">
        <h2 className="text-2xl font-semibold text-[#1C478A] mb-3">12. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The latest version will always be available on request or on our website.
        </p>
      </section>
    </main>
  );
}
