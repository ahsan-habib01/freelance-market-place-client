import React from 'react';

const Statistics = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-400 to-red-400 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '50K+', label: 'Active Users' },
            { number: '98%', label: 'Satisfaction' },
            { number: '150+', label: 'Countries' },
            { number: '24/7', label: 'Support' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-xl text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;