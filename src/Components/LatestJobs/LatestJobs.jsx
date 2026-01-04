import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import JobCard from '../JobCard/JobCard';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../Loading/Loading';

const LatestJobs = () => {
  const axiosSecure = useAxiosSecure();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axiosSecure.get('/latest-jobs'); // ✅ Latest jobs API
        setJobs(data);
      } catch (error) {
        console.error('Error fetching latest jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [axiosSecure]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section
      className="
        py-20 
        bg-gradient-to-br from-[#ffebe0] via-[#fff0e5] to-[#fff5ec]
        dark:from-gray-800 dark:via-[#14181f] dark:to-[#1a1f27]
      "
    >
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-bold text-[#ff6900] dark:text-[#ff9346]"
        >
          Latest Jobs
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gray-700 dark:text-gray-300 mt-3 text-lg max-w-2xl mx-auto"
        >
          Discover the newest freelance opportunities added by professionals
          around the world.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-11/12 mx-auto"
      >
        {jobs.length > 0 ? (
          jobs.map(job => (
            <motion.div
              key={job._id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <JobCard job={job} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 col-span-3">
            No recent jobs found.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default LatestJobs;
