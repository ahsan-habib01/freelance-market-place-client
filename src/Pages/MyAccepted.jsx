import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Components/Loading/Loading';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router';

const MyAccepted = () => {
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

  // ✅ Handle DONE or CANCEL (delete job)
  const handleRemoveJob = async (id, type) => {
    try {
      // Optimistically remove from UI
      setAcceptedJobs(prev => prev.filter(job => job._id !== id));

      const res = await axiosSecure.delete(`/accepted-jobs/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success(
          type === 'done'
            ? ' Job marked as done!'
            : ' Job cancelled successfully!'
        );
      } else {
        toast.error('Failed to remove job from database.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error removing job.');
    }
  };

  if (loading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 text-green-700 dark:text-green-400"
      >
        My Accepted Tasks ({acceptedJobs.length})
      </motion.h2>

      {acceptedJobs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          You haven’t accepted any jobs yet.
        </p>
      ) : (
        <div className="overflow-x-auto max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Posted By</th>
                <th className="py-3 px-4">Accepted At</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {acceptedJobs.map(job => (
                <motion.tr
                  key={job._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-3 px-4 font-medium text-gray-800 dark:text-white">
                    {job.title}
                  </td>

                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {job.category}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {job.postedBy}
                  </td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                    {new Date(job.acceptedAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleRemoveJob(job._id, 'done')}
                      className="text-green-600 hover:text-green-800 transition"
                      title="Mark as Done"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleRemoveJob(job._id, 'cancel')}
                      className="text-red-600 hover:text-red-800 transition"
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

export default MyAccepted;
