import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Replace this with your actual API call later
    fetch('http://localhost:3000/jobs')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setJobs(data)

      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-10">
        All Freelance Jobs
      </h2>

      {/* Grid Layout */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, index) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl duration-300"
          >
            {/* Cover Image */}
            <img
              src={job.coverImage}
              alt={job.title}
              className="h-48 w-full object-cover"
            />

            {/* Card Content */}
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Category:{' '}
                <span className="text-green-700 dark:text-green-400">
                  {job.category}
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                {job.summary}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Posted by: {job.postedBy}
              </p>

              {/* View Details */}
              <Link to={`/allJobs/${index}`}>
                <button className="mt-3 w-full py-2 bg-green-700 text-white font-medium rounded-xl hover:bg-green-800 transition-all">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
