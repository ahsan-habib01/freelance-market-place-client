import { ChevronRight } from 'lucide-react';
import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#fff3e5] via-[#ffe8d2] to-[#ffd9b8] dark:from-gray-800 dark:via-[#181d23] dark:to-[#20262e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Sign Up Free',
              desc: 'Create your account in less than 60 seconds',
            },
            {
              step: '2',
              title: 'Customize Setup',
              desc: 'Tailor the platform to your specific needs',
            },
            {
              step: '3',
              title: 'Start Growing',
              desc: 'Launch and scale your business effortlessly',
            },
          ].map((item, i) => (
            <div key={i} className="text-center relative">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              {i < 2 && (
                <ChevronRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;