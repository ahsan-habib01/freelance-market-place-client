import { Star } from 'lucide-react';
import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#fff5ec] via-[#fff0e5] to-[#ffebe0] dark:from-[#0f1116] dark:via-[#14181f] dark:to-[#1a1f27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Don't just take our word for it
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah Johnson',
              role: 'CEO, TechCorp',
              rating: 5,
              text: 'This platform transformed how we do business. The ROI was incredible!',
            },
            {
              name: 'Michael Chen',
              role: 'Founder, StartupXYZ',
              rating: 5,
              text: 'Best decision we made this year. Support team is amazing!',
            },
            {
              name: 'Emma Williams',
              role: 'Marketing Director',
              rating: 5,
              text: 'Intuitive, powerful, and exactly what we needed. Highly recommend!',
            },
          ].map((testimonial, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
