import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Components/Loading/Loading';
import JobCard from '../Components/JobCard/JobCard';

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
        console.log('Fetched my jobs:', res.data);
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
    <div className="mx-2 my-10">
      <div className="text-2xl text-center font-bold mt-5">
        My Added Jobs ({jobs.length})
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
