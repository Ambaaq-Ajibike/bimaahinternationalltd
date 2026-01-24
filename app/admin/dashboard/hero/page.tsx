'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

interface HeroData {
  heading: string;
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export default function HeroManagementPage() {
  const [heroData, setHeroData] = useState<HeroData>({
    heading: 'Trusted Immigration & Advisory Services',
    subtext: 'Expert support for visas, appeals, benefits and legal documentation — clear guidance at every step so you can move forward with confidence.',
    ctaPrimary: 'Book a Consultation',
    ctaSecondary: 'View Services',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    try {
      const docRef = doc(db, 'content', 'hero');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setHeroData(docSnap.data() as HeroData);
      }
    } catch (error) {
      console.error('Error loading hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      await setDoc(doc(db, 'content', 'hero'), {
        ...heroData,
        updatedAt: new Date(),
      });
      setMessage('Hero section updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving hero data:', error);
      setMessage('Error saving changes. Please try again.');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hero Section</h1>
        <p className="text-gray-600">Manage the main hero content on your homepage</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Heading
          </label>
          <input
            type="text"
            value={heroData.heading}
            onChange={(e) => setHeroData({ ...heroData, heading: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
            placeholder="Enter main heading"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtext
          </label>
          <textarea
            value={heroData.subtext}
            onChange={(e) => setHeroData({ ...heroData, subtext: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
            placeholder="Enter supporting text"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Button Text
            </label>
            <input
              type="text"
              value={heroData.ctaPrimary}
              onChange={(e) => setHeroData({ ...heroData, ctaPrimary: e.target.value })}
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
              value={heroData.ctaSecondary}
              onChange={(e) => setHeroData({ ...heroData, ctaSecondary: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              placeholder="e.g., View Services"
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
