import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const JobCard = ({ job }) => {
  const { _id, index, coverImage, title, category, summary, postedBy } = job;
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl duration-300"
      >
        {/* Cover Image */}
        <img
          src={coverImage}
          alt={title}
          className="h-48 w-full object-cover"
        />

        {/* Card Content */}
        <div className="p-5 space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Category:{' '}
            <span className="text-green-700 dark:text-green-400">
              {category}
            </span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
            {summary}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Posted by: {postedBy}
          </p>

          {/* View Details */}
          <Link to={`/allJobs/${_id}`}>
            <button className="mt-3 w-full py-2 bg-green-700 text-white font-medium rounded-xl hover:bg-green-800 transition-all">
              View Details
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default JobCard;
