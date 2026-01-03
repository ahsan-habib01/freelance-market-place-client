import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loading/Loading';
import JobCard from '../../../Components/JobCard/JobCard';

const MyAddedJobs = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [jobs, setJobs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (loading || !user?.email) return;

    setIsFetching(true);

    axiosSecure
      .get(`/myAddedJobs?email=${user.email}`)
      .then(res => {
        // console.log('Fetched added jobs', res.data);
        setJobs(res.data);
        setIsFetching(false);
        
      })
      .catch(err => {
        console.error('Error fetching my added jobs:', err);
        setIsFetching(false);
      });
  }, [user, loading, axiosSecure]);

  if (loading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5ec] via-[#fff0e5] to-[#ffebe0] dark:from-[#0f1116] dark:via-[#14181f] dark:to-[#1a1f27] py-12 px-4">
      <title>Check Your Added Jobs - Freelify</title>

      <div className="text-4xl font-bold text-center mb-10 text-[#ff6900] dark:text-[#ff9346]">
        My Added Jobs{' '}
        <span className="text-gray-600 dark:text-gray-400 text-lg font-normal ml-2">
          ({jobs.length})
        </span>
      </div>

      {jobs.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">
          You haven’t added any jobs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-11/12 mx-auto">
          {jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedJobs;
