'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  EnvelopeIcon, 
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/admin/dashboard/home', icon: HomeIcon },
  { name: 'About Us', href: '/admin/dashboard/about', icon: UserGroupIcon },
  { name: 'Services', href: '/admin/dashboard/services', icon: Cog6ToothIcon },
  { name: 'Testimonials', href: '/admin/dashboard/testimonials', icon: ChatBubbleLeftRightIcon },
  { name: 'FAQ', href: '/admin/dashboard/faqs', icon: QuestionMarkCircleIcon },
  { name: 'Contact', href: '/admin/dashboard/contact', icon: EnvelopeIcon },
  { name: 'Privacy', href: '/admin/dashboard/privacy', icon: ShieldCheckIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#1C478A] text-white">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/20">
            <h1 className="text-xl font-bold">Bimaah Admin</h1>
            <p className="text-white/70 text-sm mt-1">Content Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-white/20">
            <div className="px-4 py-2 mb-2">
              <p className="text-white/70 text-xs">Signed in as</p>
              <p className="text-white text-sm font-medium truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition w-full"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
