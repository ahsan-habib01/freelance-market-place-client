import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import {
  Briefcase,
  DollarSign,
  Clock,
  MapPin,
  Users,
  Calendar,
  Globe,
  Award,
  Tag,
  Mail,
  User,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
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
      price: job.budgetMin || 0,
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

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fff3ea] via-[#fff7f0] to-[#fffaf7] dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-[#1a1a1a] py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Hero Section with Cover Image */}
        <div className="relative h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl">
          <img
            src={job?.coverImage}
            alt={job?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Floating Status Badge */}
          <div className="absolute top-6 right-6">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md ${
                job.status === 'open'
                  ? 'bg-green-500/90 text-white'
                  : 'bg-red-500/90 text-white'
              }`}
            >
              {job.status === 'open' ? '🟢 Open' : '🔴 Closed'}
            </span>
          </div>

          {/* Title and Category Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-4 py-1.5 bg-[#ff6900]/90 backdrop-blur-md text-white text-sm font-semibold rounded-full">
                {job?.category}
              </span>
              {job?.experienceLevel && (
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-sm font-semibold rounded-full">
                  {job.experienceLevel}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {job?.title}
            </h1>
            <p className="text-lg text-gray-200 max-w-3xl">{job?.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-[#12161c] rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Briefcase className="text-[#ff6900]" />
                Job Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {job?.description}
              </p>
            </motion.div>

            {/* Skills & Requirements */}
            {job.skills && job.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-[#12161c] rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="text-[#ff6900]" />
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gradient-to-r from-[#ff9346]/20 to-[#ff6900]/20 dark:from-[#ff9346]/30 dark:to-[#ff6900]/30 text-[#ff6900] dark:text-[#ff9346] rounded-lg font-medium border border-[#ff9346]/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-[#12161c] rounded-2xl p-8 shadow-lg"
            >
              <div className="flex flex-wrap gap-4">
                {!isOwner && (
                  <button
                    onClick={handleAcceptJob}
                    disabled={isAccepted}
                    className={`flex-1 min-w-[200px] px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                      isAccepted
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#ff9346] to-[#ff6900] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {isAccepted ? (
                      <>
                        <CheckCircle size={20} /> Already Accepted
                      </>
                    ) : (
                      <>
                        <Briefcase size={20} /> Accept This Job
                      </>
                    )}
                  </button>
                )}

                {isOwner && (
                  <>
                    <Link
                      to={`/dashboard/update-job/${id}`}
                      className="flex-1 min-w-[200px]"
                    >
                      <button className="w-full px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2">
                        <Edit size={20} /> Update Job
                      </button>
                    </Link>

                    <button
                      onClick={handleDeleteJob}
                      className="flex-1 min-w-[200px] px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#f87171] to-[#ef4444] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Trash2 size={20} /> Delete Job
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Budget & Timeline Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-[#12161c] rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <DollarSign className="text-[#ff6900]" />
                Budget & Timeline
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign
                    className="text-[#ff6900] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Budget
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {job.budgetType === 'range'
                        ? `${job.currency} ${job.budgetMin} - ${job.budgetMax}`
                        : `${job.currency} ${job.budgetMin}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock
                    className="text-[#ff6900] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Duration
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {job.duration} {job.durationUnit}
                    </p>
                  </div>
                </div>

                {job.deadline && (
                  <div className="flex items-start gap-3">
                    <Calendar
                      className="text-[#ff6900] mt-1 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Deadline
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatDate(job.deadline)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Users
                    className="text-[#ff6900] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Positions
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {job.numberOfPositions}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag
                    className="text-[#ff6900] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Applicants
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {job.applicants || 0}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Job Details Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-[#12161c] rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="text-[#ff6900]" />
                Job Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-[#ff6900] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {job.locationType}
                    </p>
                    {job.location && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {job.location}
                      </p>
                    )}
                  </div>
                </div>

                {job.workingHours && (
                  <div className="flex items-start gap-3">
                    <Clock
                      className="text-[#ff6900] mt-1 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Working Hours
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {job.workingHours}
                      </p>
                    </div>
                  </div>
                )}

                {job.language && (
                  <div className="flex items-start gap-3">
                    <Globe
                      className="text-[#ff6900] mt-1 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Language
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {job.language}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Award
                    className="text-[#ff6900] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Experience Level
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {job.experienceLevel}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Posted By Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-[#12161c] rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <User className="text-[#ff6900]" />
                Posted By
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff9346] to-[#ff6900] flex items-center justify-center text-white font-bold text-lg">
                    {job.postedBy?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {job.postedBy}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Mail size={14} /> {job.userEmail}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Posted on
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(job.postedAt)}
                  </p>
                </div>

                {job.updatedAt && job.updatedAt !== job.postedAt && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last updated
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatDate(job.updatedAt)}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default JobDetails;
