import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  Briefcase,
  DollarSign,
  Clock,
  MapPin,
  Users,
  Calendar,
  Award,
  TrendingUp,
} from 'lucide-react';

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
    experienceLevel,
    deadline,
    status,
    applicants,
    postedBy,
  } = job;

  const formatDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays <= 7) return `${diffDays} days left`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index || 0) * 0.1, duration: 0.5 }}
      className="group relative bg-white dark:bg-[#12161c] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800"
    >
      {/* Status Badge */}
      {status && (
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
              status === 'open'
                ? 'bg-green-500/90 text-white'
                : 'bg-red-500/90 text-white'
            }`}
          >
            {status === 'open' ? 'Open' : 'Closed'}
          </span>
        </div>
      )}

      {/* Cover Image with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

        {/* Category Badge on Image */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1.5 bg-white/90 dark:bg-[#12161c]/90 backdrop-blur-md text-[#ff6900] dark:text-[#ff9346] text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-lg">
            <Briefcase size={14} />
            {category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-4">
        {/* Title & Posted By */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#ff6900] dark:group-hover:text-[#ff9346] transition-colors duration-300 line-clamp-2 min-h-[3.5rem] mb-2">
            {title}
          </h3>
          {postedBy && (
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Users size={14} />
              by {postedBy}
            </p>
          )}
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {summary}
        </p>

        {/* Key Info Grid */}
        {/* <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 dark:border-gray-800"> */}
          {/* Budget */}
          {/* <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <DollarSign size={16} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {budgetType === 'range'
                  ? `${currency} ${budgetMin}-${budgetMax}`
                  : `${currency} ${budgetMin}`}
              </p>
            </div>
          </div> */}

          {/* Duration */}
          {/* <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Clock size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {duration} {durationUnit}
              </p>
            </div>
          </div> */}
        {/* </div> */}

        {/* Badges Row */}
        <div className="flex flex-wrap gap-2">
          {/* Location */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
            <MapPin size={12} />
            {locationType}
          </span>

          {/* Experience Level */}
          {experienceLevel && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs font-medium">
              <Award size={12} />
              {experienceLevel}
            </span>
          )}

          {/* Applicants */}
          {applicants !== undefined && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-xs font-medium">
              <TrendingUp size={12} />
              {applicants} Applied
            </span>
          )}
        </div>

        {/* Deadline & CTA */}
        <div className="flex items-center justify-between pt-2">
          {deadline && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Calendar size={14} />
              <span className="font-medium">{formatDate(deadline)}</span>
            </div>
          )}

          <Link to={`/all-jobs/${_id}`} className="ml-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-[#ff9346] to-[#ff6900] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              View Details
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </Link>
        </div>

        {/* Hover Effect Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#ff6900]/0 to-[#ff6900]/0 group-hover:from-[#ff6900]/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />
      </div>

      {/* Positions Badge (if > 1) */}
      {numberOfPositions > 1 && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-[#ff6900]/90 backdrop-blur-md text-white text-xs font-semibold rounded-full flex items-center gap-1">
            <Users size={12} />
            {numberOfPositions} Positions
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default JobCard;