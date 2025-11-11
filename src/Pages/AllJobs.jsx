import { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Components/Loading/Loading';
import JobCard from '../Components/JobCard/JobCard';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // default: newest first
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axiosSecure.get(`/jobs?sort=${sortOrder}`);
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };
    fetchJobs();
  }, [sortOrder, axiosSecure]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fff3ea] to-[#fffdfb] dark:from-[#0f172a] dark:to-[#020617] py-10 px-4 md:px-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
        <h2 className="text-3xl font-bold text-[#ff6900] dark:text-[#ff9346]">
          All Freelance Jobs
        </h2>

        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="border border-[#ff9346] rounded-lg px-4 py-2 bg-white text-[#ff6900] focus:outline-none focus:ring-2 focus:ring-[#ff9346]"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.length > 0 ? (
          jobs.map(job => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="text-center text-gray-600">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default AllJobs;
