import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Components/Loading/Loading';
import toast from 'react-hot-toast';

const JobDetails = () => {
  const { id } = useParams();
  const { user, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [job, setJob] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);

  // Fetch job details
  useEffect(() => {
    fetch(`https://freelify-market-place-server.vercel.app/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        setJob(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load job details');
        setLoading(false);
      });
  }, [id, setLoading]);

  // Check if already accepted
  useEffect(() => {
    if (user && job) {
      axiosSecure
        .get('/my-accepted-jobs')
        .then(res => {
          const alreadyAccepted = res.data.some(
            acceptedJob =>
              acceptedJob.jobId === id || acceptedJob.title === job?.title
          );
          setIsAccepted(alreadyAccepted);
        })
        .catch(err => console.error(err));
    }
  }, [user, id, job, axiosSecure]);

  // Accept job
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
      jobId: id,
      title: job.title,
      postedBy: job.postedBy,
      category: job.category,
      summary: job.summary,
      coverImage: job.coverImage,
      price: job.price || 0,
      status: 'in-progress',
    };
    axiosSecure
      .post('/accepted-jobs', acceptedJob)
      .then(() => {
        toast.success('Job accepted successfully!');
        setIsAccepted(true);
        navigate('/dashboard/my-accepted-jobs');
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Failed to accept job');
      });
  };

  const handleDeleteJob = () => {
    navigate(`/dashboard/delete-job/${id}`);
  };

  if (loading) return <Loading />;
  if (!job)
    return <div className="text-center py-20 text-gray-500">Job not found</div>;

  const isOwner = user && user.email === job?.userEmail;

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fff3ea] via-[#fff7f0] to-[#fffaf7] dark:from-[#1a1a1a] dark:via-[#111] dark:to-[#000] py-12 px-4">
      <title>{job?.title}</title>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white dark:bg-[#121212] shadow-2xl rounded-3xl overflow-hidden backdrop-blur-sm border border-[#ff9346]/30"
      >
        {/* Cover Image */}
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={job?.coverImage}
          alt={job?.title}
          className="w-full h-96 object-cover"
        />

        {/* Job Content */}
        <div className="p-8 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ff6900] dark:text-[#ff9346]">
            {job?.title}
          </h2>

          {/* Job Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
            <p>
              <strong>Category:</strong>{' '}
              <span className="text-[#ff6900] dark:text-[#ff9346]">
                {job?.category}
              </span>
            </p>
            <p>
              <strong>Posted By:</strong> {job?.postedBy}
            </p>
            <p>
              <strong>Email:</strong> {job?.userEmail}
            </p>
            <p>
              <strong>Experience:</strong> {job?.experienceLevel}
            </p>
            <p>
              <strong>Duration:</strong> {job?.duration} {job?.durationUnit}
            </p>
            <p>
              <strong>Budget:</strong>{' '}
              {job.budgetType === 'range'
                ? `${job.budgetMin} - ${job.budgetMax} ${job.currency}`
                : `${job.budgetMin} ${job.currency}`}
            </p>
          </div>

          {/* Skills */}
          {job.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-[#ff9346]/20 text-[#ff6900] dark:bg-[#ff9346]/30 dark:text-[#fff]"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Summary */}
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed border-t border-[#ff9346]/20 pt-4">
            {job?.description}
          </p>

          {/* Buttons */}
          <div className="pt-6 flex flex-wrap gap-4">
            {!isOwner && (
              <button
                onClick={handleAcceptJob}
                disabled={isAccepted}
                className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 
                  ${
                    isAccepted
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#ff9346] to-[#ff6900] hover:shadow-lg hover:scale-[1.03]'
                  }`}
              >
                {isAccepted ? 'Accepted' : 'Accept Job'}
              </button>
            )}

            {isOwner && (
              <>
                <Link to={`/dashboard/update-job/${id}`}>
                  <button className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
                    Update Job
                  </button>
                </Link>

                <button
                  onClick={handleDeleteJob}
                  className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#f87171] to-[#ef4444] hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
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
