import Image from 'next/image';
import Link from 'next/link';
import { getContactInfo, getHeroContent, getHomeContent } from '@/lib/content';

export default async function Home() {
  const [hero, contact, home] = await Promise.all([getHeroContent(), getContactInfo(), getHomeContent()]);

  return (
    <div className="bg-white">
      {/* Full-height hero image */}
      <section className="relative h-128 sm:h-screen w-full overflow-hidden">
        <Image
          src="/assets/hero2.jpg"
          alt="Bimaah International consultation"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" aria-hidden />
        {/* Hero overlay content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-6 sm:px-10 lg:px-16 max-w-6xl text-center">
            <div className="inline-block rounded-xl px-6 py-6 sm:px-8 sm:py-8 shadow-lg">
              <h1 className="text-white text-3xl sm:text-5xl font-bold leading-tight drop-shadow-xl mb-5">
                {hero.heading}
              </h1>
              <p className="text-white/90 max-w-3xl mx-auto leading-relaxed">
                {hero.subtext}
              </p>
              <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-block rounded-md bg-navy text-white px-6 py-3 text-center font-semibold hover:bg-[#16396d] transition-colors"
                >
                  {hero.ctaPrimary}
                </Link>
                <Link
                  href="/services"
                  className="inline-block rounded-md bg-white/90 text-[#1C478A] px-6 py-3 text-center font-semibold hover:bg-white transition-colors"
                >
                  {hero.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-navy text-center text-white py-16 px-4">
        <div className="mx-auto">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">{home.servicesTitle}</h2>
            <p className="text-white/80 mt-4 leading-relaxed max-w-4xl mx-auto">
              {home.servicesDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Call us */}
      <section className="bg-white text-center text-navy py-16 px-4">
        <div className="mx-auto">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">{home.callUsTitle}</h2>
            <p>
              {home.callUsText}
            </p>
          </div>
        </div>
      </section>

      {/* Tagline + supporting image */}
      <section className="relative w-full h-64 sm:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80"
          alt="Professional consultation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/60" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <p className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {hero.heading}
          </p>
        </div>
      </section>
    </div>
  );
}
