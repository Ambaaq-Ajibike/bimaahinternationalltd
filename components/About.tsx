import Image from 'next/image';

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80"
          alt="About Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
            About Us
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left: Image */}
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <div className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80"
                  alt="Professional consultation"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="order-1 md:order-2 space-y-6">
              <p className="text-base sm:text-lg text-[#1C478A] leading-relaxed">
                Navigating immigration, benefits, and legal processes can be challenging—especially when personal circumstances or systemic barriers make the journey even harder. Bimaah International Ltd is here to bring clarity, fairness, and accessible support to everyone who needs it.
              </p>

              <p className="text-base sm:text-lg text-[#1C478A] leading-relaxed">
                Our work is grounded in dignity, justice, and genuine care. With extensive experience in immigration advice, benefits guidance, legal documentation, and community advocacy, we provide strategic expertise delivered with empathy and respect.
              </p>

              <p className="text-base sm:text-lg text-[#1C478A] leading-relaxed">
                Whether you're applying for a visa, seeking support with benefits, or preparing essential legal documents, you can expect clear, professional guidance designed to empower you at every step.
              </p>

              <div className="pt-4 space-y-2 text-base sm:text-lg font-semibold text-[#1A7EB9]">
                <p className="text-[#1C478A]">We <span className="text-[#1A7EB9]">don&apos;t just offer services.</span></p>
                <p className="text-[#1C478A]">We <span className="text-[#1A7EB9]">build trust.</span></p>
                <p className="text-[#1C478A]">We <span className="text-[#1A7EB9]">uplift voices.</span></p>
                <p className="text-[#1C478A]">We <span className="text-[#1A7EB9]">walk beside you</span> throughout your journey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#F4F7F8] py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C478A] mb-8 sm:mb-12 text-center">
            Our Values
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {[
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
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-lg p-6 shadow-md border-l-4 border-[#1A7EB9]">
                <h3 className="text-lg sm:text-xl font-semibold text-[#1A7EB9] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-[#1C478A] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1C478A] leading-relaxed">
            "We don't just offer services—we <span className="text-[#1A7EB9]">build trust</span>, <span className="text-[#1A7EB9]">uplift voices</span>, and <span className="text-[#1A7EB9]">stand beside you</span> every step of the way."
          </p>
        </div>
      </section>
    </div>
  );
}
