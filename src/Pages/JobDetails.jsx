import { useEffect, useState } from 'react'; //useContext
import { useParams } from 'react-router'; //useNavigate
import { motion } from 'framer-motion';
// import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading/Loading';

const JobDetails = () => {
  const { id } = useParams();
  // const { user } = useContext(AuthContext);
  // const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const { loading, setLoading } = useAuth();

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

  // const handleAcceptJob = () => {
  //   if (!user) {
  //     toast.warn('Please log in to accept this job');
  //     navigate('/auth/login');
  //     return;
  //   }

  //   if (user.email === job.userEmail) {
  //     toast.info('You cannot accept your own job!');
  //     return;
  //   }

  //   const acceptedJob = {
  //     jobId: job._id,
  //     title: job.title,
  //     postedBy: job.postedBy,
  //     category: job.category,
  //     summary: job.summary,
  //     coverImage: job.coverImage,
  //     userEmail: user.email,
  //     acceptedAt: new Date().toISOString(),
  //   };

  //   axios
  //     .post('https://your-server-url.vercel.app/accepted-jobs', acceptedJob)
  //     .then(() => {
  //       toast.success('Job accepted successfully!');
  //       navigate('/my-accepted-tasks');
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       toast.error('Failed to accept job');
  //     });
  // };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden"
      >
        {/* Image */}
        <img
          src={job?.coverImage}
          alt={job?.title}
          className="w-full h-80 object-cover"
        />

        {/* Job Details */}
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

          {/* Accept Job Button */}
          <div className="pt-6">
            <button
              // onClick={handleAcceptJob}
              className="px-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition-all"
            >
              Accept Job
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetails;
