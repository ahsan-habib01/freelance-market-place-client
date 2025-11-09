import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading/Loading';
import JobCard from '../Components/JobCard/JobCard';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const {loading} = useAuth()

  useEffect(() => {
    // Replace this with your actual API call later
    fetch('http://localhost:3000/jobs')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setJobs(data)

      });
  }, []);

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-10">
        All Freelance Jobs
      </h2>

      {/* Grid Layout */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job}></JobCard>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
