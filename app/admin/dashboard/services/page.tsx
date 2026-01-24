'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Service {
  id: string;
  title: string;
  description: string;
  items?: string[];
  order: number;
}

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    items: [] as string[],
    order: 0,
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'services'));
      const servicesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Service[];
      
      setServices(servicesData.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editing) {
        await updateDoc(doc(db, 'services', editing.id), formData);
        setMessage('Service updated successfully!');
      } else {
        await addDoc(collection(db, 'services'), {
          ...formData,
          order: services.length,
        });
        setMessage('Service added successfully!');
      }
      
      setShowForm(false);
      setEditing(null);
      setFormData({ title: '', description: '', items: [], order: 0 });
      loadServices();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving service:', error);
      setMessage('Error saving service. Please try again.');
    }
  };

  const handleEdit = (service: Service) => {
    setEditing(service);
    setFormData({
      title: service.title,
      description: service.description,
      items: service.items || [],
      order: service.order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await deleteDoc(doc(db, 'services', id));
      setMessage('Service deleted successfully!');
      loadServices();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting service:', error);
      setMessage('Error deleting service. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setFormData({ title: '', description: '', items: [], order: 0 });
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Services</h1>
          <p className="text-gray-600">Manage your service offerings</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1C478A] text-white rounded-lg font-semibold hover:bg-[#16396d] transition"
          >
            <PlusIcon className="w-5 h-5" />
            Add Service
          </button>
        )}
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
          {message}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editing ? 'Edit Service' : 'Add New Service'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
                placeholder="e.g., Visa Applications"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none"
                placeholder="Describe the service..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Items (one per line)
              </label>
              <textarea
                value={formData.items.join('\n')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    items: e.target.value
                      .split('\n')
                      .map((item) => item.trim())
                      .filter((item) => item.length > 0),
                  })
                }
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C478A] focus:border-transparent outline-none font-mono text-sm"
                placeholder="Visa applications and appeals&#10;EU settlement scheme guidance&#10;Indefinite leave to remain"
              />
              <p className="text-xs text-gray-500 mt-1">Enter each item on a new line</p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-[#1C478A] text-white rounded-lg font-semibold hover:bg-[#16396d] transition"
              >
                {editing ? 'Update Service' : 'Add Service'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {services.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
            No services added yet. Click "Add Service" to get started.
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-3">{service.description}</p>
                  {service.items && service.items.length > 0 && (
                    <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                      {service.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
