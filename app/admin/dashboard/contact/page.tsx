'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

interface ContactData {
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  tiktok: string;
}

export default function ContactManagementPage() {
  const [contactData, setContactData] = useState<ContactData>({
    phone: '03334040491',
    email: 'info@bimaahinternationalltd.com',
    address: '10 Toronto Road, Tilbury, RM18 7RL United Kingdom',
    instagram: 'https://www.instagram.com/bimaah2017?igsh=N3pyMmh2Y3J0Mmxx&utm_source=qr',
    facebook: 'https://web.facebook.com/bimaahinternational',
    tiktok: 'https://www.tiktok.com/@bimaahinternational?_r=1&_t=ZN-934cAFesF1i',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadContactData();
  }, []);

  const loadContactData = async () => {
    try {
      const docRef = doc(db, 'content', 'contact');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setContactData(docSnap.data() as ContactData);
      }
    } catch (error) {
      console.error('Error loading contact data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      await setDoc(doc(db, 'content', 'contact'), {
        ...contactData,
        updatedAt: new Date(),
      });
      setMessage('Contact information updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving contact data:', error);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Information</h1>
        <p className="text-gray-600">Manage contact details and social media links</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
          {message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={contactData.phone}
              onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={contactData.email}
              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              placeholder="Email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              value={contactData.address}
              onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              placeholder="Business address"
            />
          </div>
        </div>

        <div className="pt-6 border-t space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Social Media Links</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram URL
            </label>
            <input
              type="url"
              value={contactData.instagram}
              onChange={(e) => setContactData({ ...contactData, instagram: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              placeholder="https://instagram.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook URL
            </label>
            <input
              type="url"
              value={contactData.facebook}
              onChange={(e) => setContactData({ ...contactData, facebook: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              placeholder="https://facebook.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TikTok URL
            </label>
            <input
              type="url"
              value={contactData.tiktok}
              onChange={(e) => setContactData({ ...contactData, tiktok: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
              placeholder="https://tiktok.com/..."
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
