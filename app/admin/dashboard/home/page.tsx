'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { toast } from 'sonner';

interface HomeData {
  heading: string;
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  servicesTitle: string;
  servicesDescription: string;
  callUsTitle: string;
  callUsText: string;
}

const defaultHomeData: HomeData = {
  heading: 'Trusted Immigration & Advisory Services',
  subtext: 'Expert support for visas, appeals, benefits and legal documentation — clear guidance at every step so you can move forward with confidence.',
  ctaPrimary: 'Book a Consultation',
  ctaSecondary: 'View Services',
  servicesTitle: 'OUR SERVICES',
  servicesDescription: 'From complex visa applications and immigration appeals to benefits assessments and welfare support, we provide expert legal documentation and advocacy services tailored to your unique circumstances. Our experienced team ensures you understand every stage of the process, empowering you with the clarity and confidence needed to navigate challenging situations with dignity and assurance.',
  callUsTitle: 'CALL US FOR ADVICE',
  callUsText: 'Call us now on our phone number or send us an e-mail to get in touch.',
};

export default function HomeManagementPage() {
  const [homeData, setHomeData] = useState<HomeData>(defaultHomeData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const docRef = doc(db, 'content', 'home');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setHomeData({ ...defaultHomeData, ...docSnap.data() } as HomeData);
      }
    } catch (error) {
      console.error('Error loading home data:', error);
      toast.error('Failed to load home data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      await setDoc(doc(db, 'content', 'home'), {
        ...homeData,
        updatedAt: new Date(),
      });
      toast.success('Home page updated successfully!');
    } catch (error) {
      console.error('Error saving home data:', error);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Home Page</h1>
        <p className="text-gray-600">Manage all sections of your homepage</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
        {/* Hero Section */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Hero Section</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Heading
            </label>
            <input
              type="text"
              value={homeData.heading}
              onChange={(e) => setHomeData({ ...homeData, heading: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none mb-6"
              placeholder="Enter main heading"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtext
            </label>
            <textarea
              value={homeData.subtext}
              onChange={(e) => setHomeData({ ...homeData, subtext: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none mb-6"
              placeholder="Enter supporting text"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={homeData.ctaPrimary}
                  onChange={(e) => setHomeData({ ...homeData, ctaPrimary: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
                  placeholder="e.g., Book a Consultation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={homeData.ctaSecondary}
                  onChange={(e) => setHomeData({ ...homeData, ctaSecondary: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
                  placeholder="e.g., View Services"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Our Services Section */}
        <div className="pb-8 border-b">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Our Services Section</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={homeData.servicesTitle}
              onChange={(e) => setHomeData({ ...homeData, servicesTitle: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none mb-6"
              placeholder="e.g., OUR SERVICES"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Description
            </label>
            <textarea
              value={homeData.servicesDescription}
              onChange={(e) => setHomeData({ ...homeData, servicesDescription: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              placeholder="Enter services description"
            />
          </div>
        </div>

        {/* Call Us Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Call Us Section</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <input
              type="text"
              value={homeData.callUsTitle}
              onChange={(e) => setHomeData({ ...homeData, callUsTitle: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none mb-6"
              placeholder="e.g., CALL US FOR ADVICE"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Text
            </label>
            <textarea
              value={homeData.callUsText}
              onChange={(e) => setHomeData({ ...homeData, callUsText: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              placeholder="Enter call us section text"
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
