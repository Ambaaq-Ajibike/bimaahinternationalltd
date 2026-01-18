'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const services = [
    { name: 'Immigration Advice', href: '/services' },
    { name: 'Benefits and Welfare Support', href: '/services' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/assets/bimahlogo.png" alt="Bimaah International Ltd" width={60} height={60} />
              <span className="text-xl font-bold text-navy">Bimaah International Ltd</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/about" className="text-[#718A9D] hover:text-[#1A7EB9] transition font-medium">
              About Us
            </Link>
            <div className="relative group">
              <button 
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="text-[#718A9D] hover:text-[#1A7EB9] transition font-medium flex items-center"
              >
                Services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              {servicesDropdownOpen && (
                <div 
                  className="absolute left-0 mt-0 w-64 bg-white shadow-lg rounded-md py-2 z-50"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      href={service.href}
                      className="block px-4 py-2 text-[#718A9D] hover:bg-[#F4F7F8] hover:text-[#1A7EB9] transition"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/testimonials" className="text-[#718A9D] hover:text-[#1A7EB9] transition font-medium">
              Testimonials
            </Link>
            <Link href="/faq" className="text-[#718A9D] hover:text-[#1A7EB9] transition font-medium">
              FAQ
            </Link>
            <Link href="/contact" className="bg-[#1A7EB9] text-white px-4 py-2 rounded-md hover:bg-[#1B60A3] transition">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#718A9D] hover:text-[#1A7EB9]"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-[#718A9D] hover:text-[#1A7EB9] font-medium">
                About
              </Link>
              <div className="border-t pt-2">
                <p className="text-[#718A9D] font-medium mb-2">Services</p>
                <div className="pl-4 flex flex-col space-y-2">
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      href={service.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[#718A9D] hover:text-[#1A7EB9] font-medium"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/testimonials" onClick={() => setMobileMenuOpen(false)} className="text-[#718A9D] hover:text-[#1A7EB9] font-medium">
                Testimonials
              </Link>
              <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="text-[#718A9D] hover:text-[#1A7EB9] font-medium">
                FAQ
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="bg-[#1A7EB9] text-white px-4 py-2 rounded-md hover:bg-[#1B60A3] text-center">
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
