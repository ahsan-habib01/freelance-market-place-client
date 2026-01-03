import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loading/Loading';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle } from 'lucide-react';

const MyAcceptedJobs = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  // ✅ Fetch Accepted Jobs
  useEffect(() => {
    if (loading || !user?.email) return;
    setIsFetching(true);

    axiosSecure
      .get(`/my-accepted-jobs?email=${user.email}`)
      .then(res => {
        setAcceptedJobs(res.data);
        setIsFetching(false);
      })
      .catch(err => {
        console.error('Error fetching accepted jobs:', err);
        toast.error('Failed to load accepted jobs');
        setIsFetching(false);
      });
  }, [user, loading, axiosSecure]);

  // ✅ Handle DONE or CANCEL
  const handleRemoveJob = async (id, type) => {
    try {
      setAcceptedJobs(prev => prev.filter(job => job._id !== id));
      const res = await axiosSecure.delete(`/accepted-jobs/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success(
          type === 'done'
            ? 'Task marked as completed'
            : 'Task cancelled successfully'
        );
      } else {
        toast.error('Failed to update task.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error removing task.');
    }
  };

  if (loading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5ec] via-[#fff0e5] to-[#ffebe0] dark:from-[#0f1116] dark:via-[#14181f] dark:to-[#1a1f27] py-12 px-4">
      <title>Check Your Accepted Task - Freelify</title>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-10 text-[#ff6900] dark:text-[#ff9346]"
      >
        My Accepted Tasks
        <span className="text-gray-600 dark:text-gray-400 text-lg font-normal ml-2">
          ({acceptedJobs.length})
        </span>
      </motion.h2>

      {acceptedJobs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10 text-lg">
          You haven’t accepted any jobs yet. Start exploring and grow your
          profile!
        </p>
      ) : (
        <div className="overflow-x-auto max-w-6xl mx-auto bg-white/10 dark:bg-white/5 backdrop-blur-lg shadow-[0_0_25px_-8px_rgba(255,105,0,0.4)] border border-white/10 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-[#ff9346] to-[#ff6900] text-white">
              <tr>
                <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wide">
                  Title
                </th>
                <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wide">
                  Category
                </th>
                <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wide">
                  Posted By
                </th>
                <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wide">
                  Accepted At
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {acceptedJobs.map((job, i) => (
                <motion.tr
                  key={job._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="border-b dark:border-gray-700 hover:bg-[#fff4ea] dark:hover:bg-[#1c1f26]/80 transition-colors"
                >
                  <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-100">
                    {job.title}
                  </td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                    {job.category}
                  </td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                    {job.postedBy}
                  </td>
                  <td className="py-4 px-4 text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(job.acceptedAt).toLocaleString()}
                  </td>
                  <td className="py-4 px-4 flex justify-center gap-4">
                    <button
                      onClick={() => handleRemoveJob(job._id, 'done')}
                      className="text-[#16a34a] hover:scale-110 transition-transform duration-200"
                      title="Mark as Done"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleRemoveJob(job._id, 'cancel')}
                      className="text-[#e11d48] hover:scale-110 transition-transform duration-200"
                      title="Cancel Task"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAcceptedJobs;
