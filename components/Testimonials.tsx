import { MessageCircle, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      text: "Olabisi was a lifeline during my immigration process. She explained everything clearly, treated me with respect, and made me feel like I wasn't alone. I now have my visa—and my dignity intact.",
      author: "Fatima A.",
      location: "London"
    },
    {
      text: "I was overwhelmed trying to apply for Universal Credit and PIP. Bimaah International didn't just help me fill out forms—they advocated for me when I felt unheard. I'm so grateful.",
      author: "Modupe B.",
      location: "Grays"
    },
    {
      text: "Professional, empathetic, and thorough. Olabisi helped me apply for visiting visa for my mum after many refusal. Her legal letters were spot-on, and her support was unwavering.",
      author: "Amina R.",
      location: "Tilbury"
    },
    {
      text: "I attended one of Olabisi's community workshops and left feeling empowered. She breaks down complex systems in a way that makes sense—and she genuinely cares.",
      author: "Muheez Adegoke",
      location: "Lagos Nigeria"
    },
    {
      text: "I didn't think I could afford legal advice, but Bimaah International offered free guidance that changed my life. Their commitment to accessibility is real.",
      author: "Emmanuel O.",
      location: "Barking"
    }
  ];

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
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition border-l-4 border-[#1A7EB9]">
              <div className="mb-4">
                <Quote className="w-8 h-8 text-[#97C5D9]" />
              </div>
              <p className="text-[#1C478A] mb-4 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="border-t border-[#97C5D9] pt-4">
                <p className="font-semibold text-[#1A7EB9]">{testimonial.author}</p>
                <p className="text-sm text-[#718A9D]">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
