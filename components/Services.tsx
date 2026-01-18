import { Globe, Briefcase } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: 'immigration',
      icon: Globe,
      title: "Immigration Advice",
      description: "Expert guidance through complex immigration process with compassion and clarity",
      items: [
        "Visa applications and appeals",
        "EU settlement scheme guidance",
        "Indefinite leave to remain",
        "Family and private life visa",
        "Visitor visa support"
      ]
    },
    {
      id: 'benefits',
      icon: Briefcase,
      title: "Benefits and Welfare Support",
      description: "Comprehensive support navigating benefits systems with expertise and advocacy",
      items: [
        "Universal credit guidance",
        "PIP and ESA guidance",
        "Gateway assessments",
        "Appeals support",
        "Fair treatment advocacy"
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80"
          alt="Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4">
            Our Services
          </h1>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index} 
                  id={service.id}
                  className="flex flex-col h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition border border-[#97C5D9]"
                >
                  {/* Top section - Icon, Title, Description (centered) */}
                  <div className="bg-gradient-to-br from-[#F4F7F8] to-white p-8 flex flex-col items-center text-center flex-grow">
                    <div className="mb-4">
                      <IconComponent className="w-12 h-12 text-[#1A7EB9]" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-[#1A7EB9]">{service.title}</h3>
                    <p className="text-[#1C478A] text-base leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom section - List (left-aligned) */}
                  <div className="bg-white p-8 border-t border-[#97C5D9]">
                    <ul className="space-y-3">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-[#04A3E7] mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-[#1C478A]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-[#718A9D] mb-6">
              All services are provided with professionalism, confidentiality, and care.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#1A7EB9] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#1B60A3] transition"
            >
              Book Your Free Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
