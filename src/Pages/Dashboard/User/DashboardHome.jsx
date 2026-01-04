import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  FiBriefcase,
  FiCheckSquare,
  FiDollarSign,
  FiClock,
} from 'react-icons/fi';

const API_URL = 'https://freelify-market-place-server.vercel.app';

const DashboardHome = () => {
  const { user } = use(AuthContext);
  const [stats, setStats] = useState({
    totalJobsPosted: 0,
    totalJobsAccepted: 0,
    completedJobs: 0,
    inProgressJobs: 0,
    totalEarnings: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');

      // Fetch stats
      const statsRes = await axios.get(`${API_URL}/dashboard/user/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(statsRes.data);

      // Fetch chart data
      const chartRes = await axios.get(`${API_URL}/dashboard/user/chart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Transform chart data
      const transformedData = chartRes.data.map(item => ({
        month: getMonthName(item._id.month),
        jobs: item.count,
      }));
      setChartData(transformedData);

      // Fetch recent jobs
      const jobsRes = await axios.get(`${API_URL}/myAddedJobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecentJobs(jobsRes.data.slice(0, 5));

      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setLoading(false);
    }
  };

  const getMonthName = month => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[month - 1];
  };

  // Pie chart data
  const pieData = [
    { name: 'Posted', value: stats.totalJobsPosted, color: '#ff6f3c' },
    { name: 'Accepted', value: stats.totalJobsAccepted, color: '#3b82f6' },
    { name: 'Completed', value: stats.completedJobs, color: '#10b981' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff6f3c]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#ff6f3c] to-[#ff9346] rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.displayName}! 👋
        </h1>
        <p className="text-white/90">
          Here's what's happening with your freelance work today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Jobs Posted */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-[#ff6f3c]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Jobs Posted
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalJobsPosted}
              </h3>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
              <FiBriefcase className="text-[#ff6f3c] text-2xl" />
            </div>
          </div>
        </div>

        {/* Total Jobs Accepted */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Jobs Accepted
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalJobsAccepted}
              </h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <FiCheckSquare className="text-blue-500 text-2xl" />
            </div>
          </div>
        </div>

        {/* Completed Jobs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Completed
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.completedJobs}
              </h3>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <FiCheckSquare className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total Earnings
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                ${stats.totalEarnings}
              </h3>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <FiDollarSign className="text-purple-500 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Jobs Posted Over Time */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Jobs Posted (Last 6 Months)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="jobs" fill="#ff6f3c" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Job Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Job Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={entry => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Jobs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Jobs
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Posted
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentJobs.length > 0 ? (
                recentJobs.map(job => (
                  <tr
                    key={job._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {job.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {job.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      ${job.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(job.postedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No jobs posted yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
