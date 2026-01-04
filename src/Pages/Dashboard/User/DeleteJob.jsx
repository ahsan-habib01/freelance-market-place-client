// ==================== FIXED DeleteJob.jsx ====================
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure'; // ✅ Import axiosSecure
import Loading from '../../../Components/Loading/Loading';
import { Trash2 } from 'lucide-react';

const DeleteJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure(); // ✅ Use axiosSecure for authenticated requests
  const [job, setJob] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ✅ Fetch job data for display (public endpoint)
  useEffect(() => {
    fetch(`https://freelify-market-place-server.vercel.app/jobs/${id}`)
      .then(res => res.json())
      .then(data => setJob(data))
      .catch(() => toast.error('Failed to fetch job details'));
  }, [id]);

  // ✅ Confirm deletion - FIXED with axiosSecure
  const handleDeleteConfirm = async () => {
    if (!user || user.email !== job?.userEmail) {
      toast.error('You are not authorized to delete this job!');
      return;
    }

    setDeleting(true);
    try {
      await axiosSecure.delete(`/deleteJob/${id}`); // ✅ Use axiosSecure instead of axios
      toast.success('Job deleted successfully!');
      navigate('/dashboard/my-jobs');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete job!');
    } finally {
      setDeleting(false);
    }
  };

  if (loading || !job) return <Loading />;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffebe0] via-[#fff0e5] to-[#fff5ec]
        dark:from-gray-800 dark:via-[#14181f] dark:to-[#1a1f27] px-6 py-12"
    >
      <title>Delete Your Job - Freelify</title>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-white/90 dark:bg-[#121212] shadow-2xl rounded-3xl p-8 text-center border border-[#ff9346]/30"
      >
        <Trash2 className="mx-auto text-[#ff6900] dark:text-[#ff9346] w-16 h-16 mb-4" />

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Confirm Deletion
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to permanently delete the job{' '}
          <span className="font-semibold text-[#ff6900] dark:text-[#ff9346]">
            "{job.title}"
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            disabled={deleting}
            className="px-6 py-2 rounded-lg font-semibold border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleDeleteConfirm}
            disabled={deleting}
            className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-[#ff9346] to-[#ff6900] hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteJob;
