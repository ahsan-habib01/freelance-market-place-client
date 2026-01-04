import { Clock, DollarSign, MessageCircle, Target } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#ffd9b8] via-[#ffe8d2] to-[#ffd9b8] dark:from-gray-800 dark:via-[#181d23] dark:to-[#20262e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {[
              {
                icon: Clock,
                title: 'Save Time',
                desc: 'Automate repetitive tasks and focus on what matters',
              },
              {
                icon: DollarSign,
                title: 'Save Money',
                desc: 'Reduce costs by up to 40% with our efficient solutions',
              },
              {
                icon: Target,
                title: 'Achieve Goals',
                desc: 'Track progress and hit your targets faster',
              },
              {
                icon: MessageCircle,
                title: 'Better Communication',
                desc: 'Keep your team aligned and productive',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg mr-4">
                  <item.icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-400 rounded-2xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-xl mb-6 text-blue-100">
              Join thousands of happy customers today
            </p>
            <Link
              to="/all-jobs"
              className="inline-block px-4 py-2 rounded-lg font-semibold text-black bg-white hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Explore Jobs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;