'use client';

import Link from 'next/link';
import { 
  DocumentTextIcon, 
  EnvelopeIcon, 
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

const sections = [
  {
    name: 'Hero Section',
    description: 'Manage homepage hero content, heading, and CTAs',
    href: '/admin/dashboard/hero',
    icon: DocumentTextIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'Services',
    description: 'Add, edit, or remove service offerings',
    href: '/admin/dashboard/services',
    icon: Cog6ToothIcon,
    color: 'bg-purple-500',
  },
  {
    name: 'Contact Information',
    description: 'Update phone, email, and address details',
    href: '/admin/dashboard/contact',
    icon: EnvelopeIcon,
    color: 'bg-green-500',
  },
  {
    name: 'FAQs',
    description: 'Manage frequently asked questions',
    href: '/admin/dashboard/faqs',
    icon: QuestionMarkCircleIcon,
    color: 'bg-yellow-500',
  },
  {
    name: 'Testimonials',
    description: 'Add and manage client testimonials',
    href: '/admin/dashboard/testimonials',
    icon: ChatBubbleLeftRightIcon,
    color: 'bg-pink-500',
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage your website content from one place</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.href}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 border border-gray-200"
          >
            <div className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <section.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{section.name}</h2>
            <p className="text-gray-600 text-sm">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
