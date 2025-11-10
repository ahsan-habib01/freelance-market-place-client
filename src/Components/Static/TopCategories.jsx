import React from 'react';

// Sample categories data
const categories = [
  {
    name: 'Web Development',
    tagline: 'Build the web of tomorrow',
    image: 'https://i.ibb.co.com/VYWCY0Sw/photo-1593720213428-28a5b9e94613.jpg',
  },
  {
    name: 'Graphic Design',
    tagline: 'Design that inspires action',
    image: 'https://i.ibb.co.com/xttLkW6P/photo-1626785774573-4b799315345d.jpg',
  },
  {
    name: 'Digital Marketing',
    tagline: 'Boost visibility. Drive results',
    image: 'https://i.ibb.co.com/cXc3dMrj/photo-1611162617213-7d7a39e9b1d7.jpg',
  },
  {
    name: 'Writing & Content',
    tagline: 'Words that work for you',
    image: 'https://i.ibb.co.com/wfWz1vy/photo-1586943759341-be5595944989.jpg',
  },
  {
    name: 'Mobile App Development',
    tagline: 'Turn ideas into apps',
    image: 'https://i.ibb.co.com/W43ZLVVJ/photo-1645226880663-81561dcab0ae.jpg',
  },
  {
    name: 'Video & Animation',
    tagline: 'Visuals that tell stories',
    image:
      'https://i.ibb.co.com/fGL6jdWy/premium-photo-1710961232986-36cead00da3c.jpg',
  },
];

const TopCategories = () => {
  return (
    <section className="bg-green-200 py-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Top Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div
            key={cat.name}
            className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 transition-all duration-300 group-hover:bg-opacity-50">
              <h3 className="text-white text-xl font-semibold">{cat.name}</h3>
              <p className="text-white text-sm">{cat.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
