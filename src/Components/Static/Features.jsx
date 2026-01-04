import { Award, Heart, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import React from 'react';

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#fff5ec] via-[#fff0e5] to-[#ffebe0] dark:from-[#0f1116] dark:via-[#14181f] dark:to-[#1a1f27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#ff9346] dark:text-[#ff7a2a] mb-4">
            Powerful Features for Everyone
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to succeed in one platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 ">
          {[
            {
              icon: Zap,
              title: 'Lightning Fast',
              desc: 'Experience blazing fast performance with optimized infrastructure',
            },
            {
              icon: Shield,
              title: 'Secure & Safe',
              desc: 'Bank-level security with end-to-end encryption',
            },
            {
              icon: Users,
              title: 'Team Collaboration',
              desc: 'Work together seamlessly with real-time collaboration',
            },
            {
              icon: TrendingUp,
              title: 'Analytics & Insights',
              desc: 'Make data-driven decisions with powerful analytics',
            },
            {
              icon: Heart,
              title: '24/7 Support',
              desc: 'Get help anytime with our dedicated support team',
            },
            {
              icon: Award,
              title: 'Industry Leading',
              desc: 'Trusted by thousands of companies worldwide',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl hover:shadow-xl transition "
            >
              <div className="bg-orange-100 dark:bg-orange-900 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-[#ff9346] dark:text-[#ff7a2a] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;