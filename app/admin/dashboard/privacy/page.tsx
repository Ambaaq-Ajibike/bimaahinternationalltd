'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { toast } from 'sonner';

interface PrivacyData {
  lastUpdated: string;
  companyRegistration: string;
    whoWeAre: string;
  address: string;
  contactPhone: string;
  contactEmail: string;
  whatWeCollectInfo: string;
  collectingDataInfo: string;
  whyWeUseDataInfo: string;
  legalBasisInfo: string;
  dataStorageInfo: string;
  dataRetentionInfo: string;
  sharingDataIntro: string;
  sharingDataInfo: string;
  yourRightsInfo: string;
  cookiesInfo: string;
  internationalTransfersInfo: string;
  complaintsEmail1: string;
  complaintsEmail2: string;
  iaaPortalUrl: string;
  iaaEmail: string;
  complaintsInfo: string;
  updatesInfo: string;
}

const defaultPrivacyData: PrivacyData = {
  lastUpdated: '18/01/2026',
  companyRegistration: 'Bimaah International Ltd is registered in England and Wales, company registration number 16557180.',
  address: '10 Toronto Road, Tilbury, RM18 7RL United Kingdom',
  whoWeAre: 'Bimaah International Ltd is registered in England and Wales, company registration number 16557180. Our business address is 10 Toronto Road, Tilbury, RM18 7RL United Kingdom.In this document Bimaah International Ltd maybe referred to as(“we”, “our”, “us”).We provide immigration advisory services, legal drafting, benefits guidance, training, and community support services.',
  contactPhone: '03334040491',
  contactEmail: 'info@bimaahinternationalltd.com',
  whatWeCollectInfo: 'We collect personal identification data (name, date of birth, nationality, passport details), contact information (address, email, phone), immigration & legal information (visa history, case notes), financial & employment information (income, benefits), sensitive data (with explicit consent), and technical data from our website.',
  collectingDataInfo: 'We collect personal data through direct communication (email, phone, WhatsApp, in-person), online forms, third parties with consent, and publicly available sources.',
  whyWeUseDataInfo: 'We process your personal data to provide immigration and advisory services, prepare and submit applications, communicate about your case, comply with legal obligations, maintain records, and improve our services.',
  legalBasisInfo: 'We rely on consent when you agree to us handling your data, contract to deliver requested services, legal obligation for compliance with UK law, and legitimate interest for efficient service delivery. For special category data, we rely on explicit consent or where processing is necessary for legal claims.',
  dataStorageInfo: 'We use secure systems including encrypted digital storage, password-protected files, restricted staff access, secure disposal of documents, and regular data protection training.',
  dataRetentionInfo: 'We retain your data only for as long as necessary—typically 6 years after your case is closed, unless legal obligations require otherwise.',
  sharingDataIntro: 'We do not sell or trade your personal information.',
  sharingDataInfo: 'We may share your data with The Home Office, Solicitors or barristers (with consent), Local authorities or support agencies, Professional partners assisting with your case, and Regulators or law enforcement when legally required.',
  yourRightsInfo: 'You have the right to access your personal data, request correction, request deletion, restrict processing, withdraw consent, and request data portability.',
  cookiesInfo: 'If you use our website, we may use cookies to improve user experience. You can disable cookies in your browser settings.',
  internationalTransfersInfo: 'We do not routinely transfer your data outside the UK. If this becomes necessary, we ensure appropriate safeguards are in place.',
  complaintsEmail1: 'bimaahltd@gmail.com',
  complaintsEmail2: 'info@bimaahinternationalltd.com',
  iaaPortalUrl: 'https://portal.oisc.gov.uk/s/complaints',
  iaaEmail: 'info@immigrationadviceauthority.gov.uk',
  complaintsInfo: 'If you have concerns about how we handle your data, contact us first so we can resolve the issue promptly.',
  updatesInfo: 'We may update this Privacy Policy from time to time. The latest version will always be available on request or on our website.',
};

export default function PrivacyManagementPage() {
  const [privacyData, setPrivacyData] = useState<PrivacyData>(defaultPrivacyData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPrivacyData();
  }, []);

  const loadPrivacyData = async () => {
    try {
      const docRef = doc(db, 'content', 'privacy');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setPrivacyData({ ...defaultPrivacyData, ...docSnap.data() } as PrivacyData);
      }
    } catch (error) {
      console.error('Error loading privacy data:', error);
      toast.error('Failed to load privacy data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      await setDoc(doc(db, 'content', 'privacy'), {
        ...privacyData,
        updatedAt: new Date(),
      });
      toast.success('Privacy policy updated successfully!');
    } catch (error) {
      console.error('Error saving privacy data:', error);
      toast.error('Error saving changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-600">Edit all editable content on the Privacy Policy page</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
        {/* Header & Intro */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Header & Introduction</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Updated Date
            </label>
            <input
              type="text"
              value={privacyData.lastUpdated}
              onChange={(e) => setPrivacyData({ ...privacyData, lastUpdated: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              placeholder="e.g., 18/01/2026"
            />
          </div>
        </div>

        {/* Section 1: Who We Are */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">1. Who We Are</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Registration Details
              </label>
              <textarea
                value={privacyData.companyRegistration}
                onChange={(e) => setPrivacyData({ ...privacyData, companyRegistration: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Address
              </label>
              <textarea
                value={privacyData.address}
                onChange={(e) => setPrivacyData({ ...privacyData, address: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: What Personal Data We Collect */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">2. What Personal Data We Collect</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Types of Data Collected
            </label>
            <textarea
              value={privacyData.whatWeCollectInfo}
              onChange={(e) => setPrivacyData({ ...privacyData, whatWeCollectInfo: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Section 3: How We Collect Your Data */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">3. How We Collect Your Data</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Collection Methods
            </label>
            <textarea
              value={privacyData.collectingDataInfo}
              onChange={(e) => setPrivacyData({ ...privacyData, collectingDataInfo: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Section 4: Why We Use Your Data */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">4. Why We Use Your Data</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Usage Purposes
            </label>
            <textarea
              value={privacyData.whyWeUseDataInfo}
              onChange={(e) => setPrivacyData({ ...privacyData, whyWeUseDataInfo: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Section 5: Legal Basis for Processing */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">5. Legal Basis for Processing</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Legal Basis Information
            </label>
            <textarea
              value={privacyData.legalBasisInfo}
              onChange={(e) => setPrivacyData({ ...privacyData, legalBasisInfo: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Section 6: How We Store and Protect Your Data */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">6. How We Store and Protect Your Data</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Storage & Security Measures
              </label>
              <textarea
                value={privacyData.dataStorageInfo}
                onChange={(e) => setPrivacyData({ ...privacyData, dataStorageInfo: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Retention Policy
              </label>
              <textarea
                value={privacyData.dataRetentionInfo}
                onChange={(e) => setPrivacyData({ ...privacyData, dataRetentionInfo: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 7: Sharing Your Data */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">7. Sharing Your Data</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sharing Introduction (No selling clause)
              </label>
              <textarea
                value={privacyData.sharingDataIntro}
                onChange={(e) => setPrivacyData({ ...privacyData, sharingDataIntro: e.target.value })}
                rows={1}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Sharing Details
              </label>
              <textarea
                value={privacyData.sharingDataInfo}
                onChange={(e) => setPrivacyData({ ...privacyData, sharingDataInfo: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 8: Your Rights */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">8. Your Rights</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Rights Description
              </label>
              <textarea
                value={privacyData.yourRightsInfo}
                onChange={(e) => setPrivacyData({ ...privacyData, yourRightsInfo: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={privacyData.contactPhone}
                  onChange={(e) => setPrivacyData({ ...privacyData, contactPhone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={privacyData.contactEmail}
                  onChange={(e) => setPrivacyData({ ...privacyData, contactEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 9: Cookies and Website Tracking */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">9. Cookies and Website Tracking</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cookies Information
            </label>
            <textarea
              value={privacyData.cookiesInfo}
              onChange={(e) => setPrivacyData({ ...privacyData, cookiesInfo: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Section 10: International Transfers */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">10. International Transfers</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              International Transfers Information
            </label>
            <textarea
              value={privacyData.internationalTransfersInfo}
              onChange={(e) => setPrivacyData({ ...privacyData, internationalTransfersInfo: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Section 11: Complaints */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">11. Complaints</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complaints Information
              </label>
              <textarea
                value={privacyData.complaintsInfo}
                onChange={(e) => setPrivacyData({ ...privacyData, complaintsInfo: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complaints Email 1
                </label>
                <input
                  type="email"
                  value={privacyData.complaintsEmail1}
                  onChange={(e) => setPrivacyData({ ...privacyData, complaintsEmail1: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complaints Email 2
                </label>
                <input
                  type="email"
                  value={privacyData.complaintsEmail2}
                  onChange={(e) => setPrivacyData({ ...privacyData, complaintsEmail2: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IAA Portal URL
                </label>
                <input
                  type="url"
                  value={privacyData.iaaPortalUrl}
                  onChange={(e) => setPrivacyData({ ...privacyData, iaaPortalUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IAA Email
                </label>
                <input
                  type="email"
                  value={privacyData.iaaEmail}
                  onChange={(e) => setPrivacyData({ ...privacyData, iaaEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 12: Updates to This Policy */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">12. Updates to This Policy</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Policy Updates Information
            </label>
            <textarea
              value={privacyData.updatesInfo}
              onChange={(e) => setPrivacyData({ ...privacyData, updatesInfo: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-[#1C478A] text-white rounded-lg font-semibold hover:bg-[#16396d] transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
