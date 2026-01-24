import { MessageCircle, Quote } from 'lucide-react';
import { getTestimonials } from '@/lib/content';

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section id="testimonials" className="py-20 px-4 bg-[#F4F7F8]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-4">
          <MessageCircle className="w-10 h-10 text-[#1A7EB9]" />
          <h2 className="text-4xl font-bold text-center text-[#1C478A]">
            Client Testimonials
          </h2>
        </div>
        <p className="text-center text-[#718A9D] mb-12 text-lg">
          Hear from those we've helped
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.length === 0 && (
            <div className="md:col-span-3 text-center text-[#718A9D]">
              Testimonials will appear here once added in the admin dashboard.
            </div>
          )}
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition border-l-4 border-[#1A7EB9]">
              <div className="mb-4">
                <Quote className="w-8 h-8 text-[#97C5D9]" />
              </div>
              <p className="text-[#1C478A] mb-4 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="border-t border-[#97C5D9] pt-4">
                <p className="font-semibold text-[#1A7EB9]">{testimonial.name}</p>
                <p className="text-sm text-[#718A9D]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
