import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router'; 

const JobCard = ({ job, index }) => {
  const { _id, coverImage, title, category, summary, postedBy } = job;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index || 0) * 0.1, duration: 0.5 }}
      className="group bg-white dark:bg-[#12161c] shadow-md rounded-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Cover Image */}
      <div className="relative overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#ff6900] transition-colors duration-300">
          {title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Category:{' '}
          <span className="text-[#ff6900] dark:text-[#ff9346] font-semibold">
            {category}
          </span>
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {summary}
        </p>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          Posted by:{' '}
          <span className="text-gray-700 dark:text-gray-300">{postedBy}</span>
        </p>

        {/* View Details Button */}
        <Link to={`/all-jobs/${_id}`}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="mt-3 w-full py-2.5 bg-gradient-to-r from-[#ff9346] to-[#ff6900] text-white font-semibold rounded-xl 
            shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300"
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard;
