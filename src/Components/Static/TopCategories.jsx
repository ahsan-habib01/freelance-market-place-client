import { motion } from 'framer-motion';
import React from 'react';

const categories = [
  {
    name: 'Web Development',
    tagline: 'Build the web of tomorrow',
    image: 'https://i.ibb.co/VYWCY0Sw/photo-1593720213428-28a5b9e94613.jpg',
  },
  {
    name: 'Graphic Design',
    tagline: 'Design that inspires action',
    image: 'https://i.ibb.co/xttLkW6P/photo-1626785774573-4b799315345d.jpg',
  },
  {
    name: 'Digital Marketing',
    tagline: 'Boost visibility. Drive results',
    image: 'https://i.ibb.co/cXc3dMrj/photo-1611162617213-7d7a39e9b1d7.jpg',
  },
  {
    name: 'Writing & Content',
    tagline: 'Words that work for you',
    image: 'https://i.ibb.co/wfWz1vy/photo-1586943759341-be5595944989.jpg',
  },
  {
    name: 'Mobile App Development',
    tagline: 'Turn ideas into apps',
    image: 'https://i.ibb.co/W43ZLVVJ/photo-1645226880663-81561dcab0ae.jpg',
  },
  {
    name: 'Video & Animation',
    tagline: 'Visuals that tell stories',
    image:
      'https://i.ibb.co/fGL6jdWy/premium-photo-1710961232986-36cead00da3c.jpg',
  },
];

const TopCategories = () => {
  return (
    <section className="relative py-20 px-6 md:px-10 bg-gradient-to-br from-[#fff3e5] via-[#ffe8d2] to-[#ffd9b8] dark:from-[#111418] dark:via-[#181d23] dark:to-[#20262e] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-32 left-20 w-72 h-72 bg-[#ff9346]/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-72 h-72 bg-[#ff6900]/20 blur-3xl rounded-full animate-pulse delay-300"></div>
      </div>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#ff6900] dark:text-[#ff9346] mb-4">
          Explore Top Categories
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Discover diverse opportunities and showcase your skills across our
          most popular freelance categories.
        </p>
        {/* <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-[#ff9346] to-[#ff6900] rounded-full"></div> */}
      </motion.div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer transition-all duration-500"
          >
            {/* Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-60 md:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 dark:from-black/80 dark:to-black/50 transition-all duration-500"></div>

            {/* Text */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-semibold mb-1">{cat.name}</h3>
              <p className="text-sm md:text-base opacity-90">{cat.tagline}</p>
            </div>

            {/* Border Glow */}
            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-black/30 to-black/30 blur-xl"></span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
