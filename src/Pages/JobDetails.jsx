import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading/Loading';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const JobDetails = () => {
  const { id } = useParams();
  const { user, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/jobs/${id}`)
      .then(res => {
        setJob(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load job details');
      });
  }, [id, setLoading]);

  // ✅ Accept Job
  const handleAcceptJob = () => {
    if (!user) {
      toast.error('Please log in to accept this job');
      navigate('/auth/login');
      return;
    }

    if (user.email === job.userEmail) {
      toast.error('You cannot accept your own job!');
      return;
    }

    const acceptedJob = {
      title: job.title,
      postedBy: job.postedBy,
      category: job.category,
      summary: job.summary,
      coverImage: job.coverImage,
      userEmail: user.email,
      acceptedAt: new Date().toISOString(),
    };

    axios
      .post('http://localhost:3000/accepted-jobs', acceptedJob)
      .then(() => {
        toast.success('Job accepted successfully!');
        navigate('/my-accepted-tasks');
      })
      .catch(() => toast.error('Failed to accept job'));
  };

  // ✅ Delete Job (Only Owner)
  const handleDeleteJob = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete your job.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/deleteJob/${id}`)
          .then(() => {
            Swal.fire('Deleted!', 'Job has been deleted.', 'success');
            navigate('/myAddedJobs');
          })
          .catch(() => Swal.fire('Error', 'Failed to delete job', 'error'));
      }
    });
  };

  if (loading) return <Loading />;

  const isOwner = user && user.email === job?.userEmail;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden"
      >
        <img
          src={job?.coverImage}
          alt={job?.title}
          className="w-full h-80 object-cover"
        />

        <div className="p-8 space-y-4">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">
            {job?.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Category:</strong> {job?.category}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Posted By:</strong> {job?.postedBy}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Posted Email:</strong> {job?.userEmail}
          </p>
          <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
            {job?.summary}
          </p>

          <div className="pt-6 flex flex-wrap gap-3">
            {/* ✅ Accept Button for Others */}
            {!isOwner && (
              <button
                onClick={handleAcceptJob}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
              >
                Accept Job
              </button>
            )}

            {/* ✅ Update & Delete for Owner Only */}
            {isOwner && (
              <>
                <Link to={`/update-job/${id}`}>
                  <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all">
                    Update Job
                  </button>
                </Link>

                <button
                  onClick={handleDeleteJob}
                  className="px-6 py-3 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-all"
                >
                  Delete Job
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetails;
