import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Briefcase, DollarSign, Clock, MapPin, Users } from 'lucide-react';

const JobCard = ({ job, index }) => {
  const {
    _id,
    coverImage,
    title,
    category,
    summary,
    budgetType,
    budgetMin,
    budgetMax,
    currency,
    duration,
    durationUnit,
    locationType,
    location,
    numberOfPositions,
  } = job;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index || 0) * 0.1, duration: 0.5 }}
      className="group bg-white dark:bg-[#12161c] shadow-md rounded-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#ff6900] transition-colors duration-300 line-clamp-2 min-h-[3.25rem]">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {summary}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-2 text-sm">
          <span className="inline-flex items-center gap-1 bg-[#ff9346]/10 text-[#ff6900] dark:bg-[#ff9346]/20 dark:text-[#ff9346] px-2 py-1 rounded-full font-medium">
            <Briefcase className="w-3 h-3" /> {category}
          </span>

          <span className="inline-flex items-center gap-1 bg-[#ff9346]/10 text-[#ff6900] dark:bg-[#ff9346]/20 dark:text-[#ff9346] px-2 py-1 rounded-full font-medium">
            <DollarSign className="w-3 h-3" />{' '}
            {budgetType === 'range'
              ? `${currency} ${budgetMin} - ${budgetMax}`
              : `${currency} ${budgetMin}`}
          </span>

          <span className="inline-flex items-center gap-1 bg-[#ff9346]/10 text-[#ff6900] dark:bg-[#ff9346]/20 dark:text-[#ff9346] px-2 py-1 rounded-full font-medium">
            <Clock className="w-3 h-3" /> {duration} {durationUnit}
          </span>

          <span className="inline-flex items-center gap-1 bg-[#ff9346]/10 text-[#ff6900] dark:bg-[#ff9346]/20 dark:text-[#ff9346] px-2 py-1 rounded-full font-medium">
            <MapPin className="w-3 h-3" /> {locationType}
          </span>

          {/* <span className="inline-flex items-center gap-1 bg-[#ff9346]/10 text-[#ff6900] dark:bg-[#ff9346]/20 dark:text-[#ff9346] px-2 py-1 rounded-full font-medium">
            <Users className="w-3 h-3" /> {numberOfPositions} Pos
          </span> */}
        </div>

        {/* View Details Button */}
        <Link to={`/all-jobs/${_id}`}>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="mt-4 w-full py-2.5 bg-gradient-to-r from-[#ff9346] to-[#ff6900] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300"
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard;
