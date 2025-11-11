import React from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router';

const AboutFreelify = () => {
  const features = [
    {
      icon: (
        <ShieldCheck className="w-8 h-8 text-[#ff6900] dark:text-[#ff5500]" />
      ),
      title: 'Reliable Platform',
      desc: 'Built with secure authentication and verified clients to ensure transparency and trust for every job.',
    },
    {
      icon: <Users className="w-8 h-8 text-[#ff6900] dark:text-[#ff5500]" />,
      title: 'Seamless Collaboration',
      desc: 'Connect with skilled freelancers or clients instantly and manage projects efficiently from anywhere.',
    },
    {
      icon: <Zap className="w-8 h-8 text-[#ff6900] dark:text-[#ff5500]" />,
      title: 'Empowering Growth',
      desc: 'Freelify bridges opportunities between creative minds and businesses, helping both grow together.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fff5ec] via-[#fff0e5] to-[#ffebe0] dark:from-[#0f1116] dark:via-[#14181f] dark:to-[#1a1f27] py-24 px-6">
      {/* Animated Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2, scale: 1.2 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute top-1/3 left-1/2 w-72 h-72 bg-[#ff9346] dark:bg-[#ff7a2a] blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      ></motion.div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#ff9346] dark:text-[#ff7a2a] mb-6"
        >
          About{' '}
          <span className="text-[#ff6900] dark:text-[#ff5500]">Freelify</span>
        </motion.h2>

        {/* Section Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          Freelify is a next-generation freelancing marketplace that blends
          design, trust, and technology. Our goal is to simplify the way
          freelancers and clients connect — ensuring every project feels
          seamless, transparent, and rewarding.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#161b22] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-[#ff9346] dark:border-[#ff7a2a]"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#ff9346] dark:text-[#ff7a2a] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className=""
        >
          {/* <Link
            to="/allJobs"
            className="px-8 py-3 bg-[#ff6900]  font-semibold rounded-lg hover:bg-[#ff5506] transition"
          >
            Explore Jobs
          </Link> */}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFreelify;
