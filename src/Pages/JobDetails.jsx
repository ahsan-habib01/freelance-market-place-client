import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading/Loading';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const { user, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);

  // ✅ Fetch job details
  useEffect(() => {
    axios
      .get(`https://freelify-market-place-server.vercel.app/jobs/${id}`)
      .then(res => {
        setJob(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load job details');
      });
  }, [id, setLoading]);

  // ✅ Check if the user already accepted the job
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://freelify-market-place-server.vercel.app/accepted-jobs?userEmail=${user.email}`
        )
        .then(res => {
          const alreadyAccepted = res.data.some(
            job =>
              job.title === job?.title && job.coverImage === job?.coverImage
          );
          setIsAccepted(alreadyAccepted);
        })
        .catch(err => console.error('Failed to check accepted job:', err));
    }
  }, [user, id]);

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
      .post(
        'https://freelify-market-place-server.vercel.app/accepted-jobs',
        acceptedJob
      )
      .then(() => {
        toast.success('Job accepted successfully!');
        setIsAccepted(true); // 🔥 instantly reflect change
        navigate('/dashboard/my-accepted-jobs');
      })
      .catch(() => toast.error('Failed to accept job'));
  };

  // ✅ Delete Job
  const handleDeleteJob = () => {
    navigate(`/dashboard/delete-job/${id}`);
  };

  if (loading) return <Loading />;

  const isOwner = user && user.email === job?.userEmail;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fff3ea] via-[#fff7f0] to-[#fffaf7] dark:from-[#1a1a1a] dark:via-[#111] dark:to-[#000] py-12 px-4">
      <title>{job?.title}</title>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white/90 dark:bg-[#121212] shadow-2xl rounded-3xl overflow-hidden backdrop-blur-sm border border-[#ff9346]/30"
      >
        {/* Cover Image */}
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={job?.coverImage}
          alt={job?.title}
          className="w-full h-80 object-cover"
        />

        {/* Job Info */}
        <div className="p-8 space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ff6900] dark:text-[#ff9346]">
            {job?.title}
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Category:</strong>{' '}
            <span className="text-[#ff6900] dark:text-[#ff9346] font-medium">
              {job?.category}
            </span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Posted By:</strong> {job?.postedBy}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Posted Email:</strong> {job?.userEmail}
          </p>

          <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed border-t border-[#ff9346]/20 pt-4">
            {job?.summary}
          </p>

          {/* Buttons */}
          <div className="pt-6 flex flex-wrap gap-4">
            {!isOwner && (
              <button
                onClick={handleAcceptJob}
                disabled={isAccepted}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 
                  ${
                    isAccepted
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#ff9346] to-[#ff6900] hover:shadow-lg hover:scale-[1.02]'
                  }`}
              >
                {isAccepted ? 'Accepted' : 'Accept Job'}
              </button>
            )}

            {isOwner && (
              <>
                <Link to={`dashboard/update-job/${id}`}>
                  <button className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                    Update Job
                  </button>
                </Link>

                <button
                  onClick={handleDeleteJob}
                  className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#f87171] to-[#ef4444] hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  Delete Job
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default JobDetails;
