import React, { useEffect, useState } from 'react';
import JobCard from '../JobCard/JobCard';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../Loading/Loading';

const LatestJobs = () => {
  const axiosSecure = useAxiosSecure();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axiosSecure.get('/latest-jobs'); // ✅ Correct endpoint
        setJobs(data);
      } catch (error) {
        console.error('Error fetching latest jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [axiosSecure]);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
        🚀 Latest Jobs
      </h2>
      <div className="grid md:grid-cols-3 gap-6 w-11/12 mx-auto">
        {jobs.length > 0 ? (
          jobs.map(job => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="text-center text-gray-600 col-span-3">
            No recent jobs found.
          </p>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
