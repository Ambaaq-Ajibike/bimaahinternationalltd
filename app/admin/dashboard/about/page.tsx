'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { toast } from 'sonner';

interface AboutData {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  valuesTitle: string;
  values: Array<{
    title: string;
    description: string;
  }>;
  closingStatement: string;
}

const defaultAboutData: AboutData = {
  title: 'About Us',
  paragraph1: 'Navigating immigration, benefits, and legal processes can be challenging—especially when personal circumstances or systemic barriers make the journey even harder. Bimaah International Ltd is here to bring clarity, fairness, and accessible support to everyone who needs it.',
  paragraph2: 'Our work is grounded in dignity, justice, and genuine care. With extensive experience in immigration advice, benefits guidance, legal documentation, and community advocacy, we provide strategic expertise delivered with empathy and respect.',
  paragraph3: "Whether you're applying for a visa, seeking support with benefits, or preparing essential legal documents, you can expect clear, professional guidance designed to empower you at every step.",
  valuesTitle: 'Our Values',
  values: [
    {
      title: 'Accessibility for all',
      description: 'We ensure our services are available to everyone, regardless of financial circumstances.',
    },
    {
      title: 'Professional integrity',
      description: 'We maintain the highest standards in all our work.',
    },
    {
      title: 'Empathetic advocacy',
      description: 'We listen, understand, and advocate with compassion.',
    },
    {
      title: 'Community empowerment',
      description: 'We uplift voices and build stronger communities.',
    },
  ],
  closingStatement: '"We don\'t just offer services—we build trust, uplift voices, and stand beside you every step of the way."',
};

export default function AboutManagementPage() {
  const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    try {
      const docRef = doc(db, 'content', 'about');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setAboutData({ ...defaultAboutData, ...docSnap.data() } as AboutData);
      }
    } catch (error) {
      console.error('Error loading about data:', error);
      toast.error('Failed to load about data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      await setDoc(doc(db, 'content', 'about'), {
        ...aboutData,
        updatedAt: new Date(),
      });
      toast.success('About page updated successfully!');
    } catch (error) {
      console.error('Error saving about data:', error);
      toast.error('Error saving changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateValue = (index: number, field: 'title' | 'description', value: string) => {
    const newValues = [...aboutData.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setAboutData({ ...aboutData, values: newValues });
  };

  const addValue = () => {
    setAboutData({
      ...aboutData,
      values: [...aboutData.values, { title: '', description: '' }],
    });
  };

  const removeValue = (index: number) => {
    const newValues = aboutData.values.filter((_, i) => i !== index);
    setAboutData({ ...aboutData, values: newValues });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">About Us Page</h1>
        <p className="text-gray-600">Manage the content displayed on the About Us page</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Title
          </label>
          <input
            type="text"
            value={aboutData.title}
            onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Paragraph
          </label>
          <textarea
            value={aboutData.paragraph1}
            onChange={(e) => setAboutData({ ...aboutData, paragraph1: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Second Paragraph
          </label>
          <textarea
            value={aboutData.paragraph2}
            onChange={(e) => setAboutData({ ...aboutData, paragraph2: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Third Paragraph
          </label>
          <textarea
            value={aboutData.paragraph3}
            onChange={(e) => setAboutData({ ...aboutData, paragraph3: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
          />
        </div>

        <div className="pt-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Values Section</h3>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Values Section Title
            </label>
            <input
              type="text"
              value={aboutData.valuesTitle}
              onChange={(e) => setAboutData({ ...aboutData, valuesTitle: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
            />
          </div>

          <div className="space-y-4">
            {aboutData.values.map((value, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-700">Value {index + 1}</span>
                  <button
                    onClick={() => removeValue(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={value.title}
                    onChange={(e) => updateValue(index, 'title', e.target.value)}
                    placeholder="Value title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
                  />
                  <textarea
                    value={value.description}
                    onChange={(e) => updateValue(index, 'description', e.target.value)}
                    placeholder="Value description"
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addValue}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            + Add Value
          </button>
        </div>

        <div className="pt-6 border-t">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Closing Statement
          </label>
          <textarea
            value={aboutData.closingStatement}
            onChange={(e) => setAboutData({ ...aboutData, closingStatement: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
          />
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
