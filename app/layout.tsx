import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bimaah International Ltd - Immigration, Benefits & Legal Consulting",
  description: "Expert immigration advice, benefits support, and legal document assistance. Founded by qualified immigration adviser Olabisi Adebayo. Empowering lives through clarity, compassion, and advocacy.",
  keywords: ["immigration advice", "immigration consultant", "visa application", "benefits support", "legal consulting", "immigration adviser UK", "Olabisi Adebayo", "vulnerable communities support", "legal documents"],
  authors: [{ name: "Bimaah International Ltd" }],
  icons: {
    icon: [
      { url: '/assets/bimahlogo.png', type: 'image/png' },
    ],
    apple: '/assets/bimahlogo.png',
  },
  openGraph: {
    title: "Bimaah International Ltd - Immigration, Benefits & Legal Consulting",
    description: "Expert immigration advice, benefits support, and legal document assistance. Your Rights. Your Voice. Our Support.",
    type: "website",
    locale: "en_GB",
    siteName: "Bimaah International Ltd",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bimaah International Ltd - Immigration, Benefits & Legal Consulting",
    description: "Expert immigration advice, benefits support, and legal document assistance.",
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "Legal Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" richColors />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
