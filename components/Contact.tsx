'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface ContactInfoProps {
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

export default function Contact({ contactInfo }: ContactInfoProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit consultation request');
      }

      // Show success toast
      toast.success('Request Submitted!', {
        description: 'Thank you for your consultation request. We\'ll get back to you within 24 hours. Please check your email for confirmation.',
        duration: 8000,
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 10000);
    } catch (err) {
      console.error('Error submitting form:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.';
      
      // Show error toast
      toast.error('Submission Failed', {
        description: errorMessage,
        duration: 6000,
      });
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-[#F4F7F8]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-[#1C478A]">
          Get In Touch
        </h2>
        <p className="text-center text-[#718A9D] mb-12 text-lg">
          Book your free consultation today
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-[#1C478A] font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#97C5D9] rounded-md focus:ring-2 focus:ring-[#1A7EB9] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[#1C478A] font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#97C5D9] rounded-md focus:ring-2 focus:ring-[#1A7EB9] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="phone" className="block text-[#1C478A] font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#97C5D9] rounded-md focus:ring-2 focus:ring-[#1A7EB9] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-[#1C478A] font-semibold mb-2">
                Service Needed *
              </label>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#97C5D9] rounded-md focus:ring-2 focus:ring-[#1A7EB9] focus:border-transparent"
              >
                <option value="">Select a service</option>
                <option value="immigration">Immigration Advice</option>
                <option value="benefits">Benefits & Welfare Support</option>
                <option value="legal">Legal Documentation</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-[#1C478A] font-semibold mb-2">
              Tell us about your situation *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[#97C5D9] rounded-md focus:ring-2 focus:ring-[#1A7EB9] focus:border-transparent"
              placeholder="Please provide details about your case..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1A7EB9] text-white py-3 px-6 rounded-md font-semibold hover:bg-[#1B60A3] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
          </button>

          <p className="text-sm text-[#718A9D] mt-4 text-center">
            All consultations are confidential and free of charge.
          </p>
        </form>

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow border-t-4 border-[#1A7EB9]">
            <div className="flex justify-center mb-3">
              <Phone className="w-10 h-10 text-[#1A7EB9]" />
            </div>
            <h3 className="font-semibold text-[#1C478A] mb-2">Call Us</h3>
            <p className="text-[#718A9D]">
              <a href={`tel:${contactInfo.phone}`} className="text-[#1A7EB9] font-semibold">{contactInfo.phone}</a>
            </p>
            <p className="text-sm text-[#718A9D] mt-2">Available Mon-Fri</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-t-4 border-[#1A7EB9]">
            <div className="flex justify-center mb-3">
              <Mail className="w-10 h-10 text-[#1A7EB9]" />
            </div>
            <h3 className="font-semibold text-[#1C478A] mb-2">Email Us</h3>
            <p className="text-[#718A9D]">
              <a href={`mailto:${contactInfo.email}`} className="text-[#1A7EB9] font-semibold block">{contactInfo.email}</a>
            </p>
            <p className="text-sm text-[#718A9D] mt-2">We aim to reply within 24 hours</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border-t-4 border-[#1A7EB9]">
            <div className="flex justify-center mb-3">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-semibold text-[#1C478A] mb-2">Visit Us</h3>
            <p className="text-[#718A9D]">{contactInfo.address}</p>
            <p className="text-sm text-[#718A9D] mt-2">By appointment</p>
            <div className="mt-3 text-sm text-[#718A9D]">
              <strong className="text-[#1C478A]">Opening hours:</strong>
              <div>Mon-Sat: 10:00am - 6:00pm</div>
              <div>Sun: 2:00pm - 6:00pm</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
