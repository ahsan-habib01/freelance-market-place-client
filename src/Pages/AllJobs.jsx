import { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Components/Loading/Loading';
import JobCard from '../Components/JobCard/JobCard';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const { loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const jobsPerPage = 12;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);

        // Build query parameters
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: jobsPerPage.toString(),
          sort: sortOrder,
        });

        if (searchTerm) params.append('search', searchTerm);
        if (categoryFilter) params.append('category', categoryFilter);
        if (locationFilter) params.append('location', locationFilter);

        const res = await axiosSecure.get(`/jobs?${params.toString()}`);
        setJobs(res.data.jobs || res.data);
        setTotalJobs(res.data.total || res.data.length);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [
    currentPage,
    sortOrder,
    searchTerm,
    categoryFilter,
    locationFilter,
    axiosSecure,
  ]);

  const handleSearch = e => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = () => {
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setLocationFilter('');
    setCurrentPage(1);
  };

  const goToPage = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (authLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fff3ea] to-[#fffdfb] dark:from-[#0f172a] dark:to-[#020617] py-10 px-4 md:px-10">
      <title>Explore All Jobs - Freelify</title>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#ff6900] dark:text-[#ff9346] mb-6">
          All Freelance Jobs
        </h2>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search jobs by title, description, or skills..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff9346]"
            />
          </div>
        </form>

        {/* Filter & Sort Section */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-[#ff6900] dark:text-[#ff9346]"
          >
            <Filter size={20} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters Container */}
          <div
            className={`flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
              showFilters ? 'block' : 'hidden lg:grid'
            }`}
          >
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={e => {
                setCategoryFilter(e.target.value);
                handleFilterChange();
              }}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff9346]"
            >
              <option value="">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Content Writing">Content Writing</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Data Entry">Data Entry</option>
            </select>

            {/* Location Filter */}
            <select
              value={locationFilter}
              onChange={e => {
                setLocationFilter(e.target.value);
                handleFilterChange();
              }}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff9346]"
            >
              <option value="">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff9346]"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          {(searchTerm || categoryFilter || locationFilter) && (
            <button
              onClick={handleClearFilters}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-gray-600 dark:text-gray-400 mb-4">
          Showing {jobs.length > 0 ? (currentPage - 1) * jobsPerPage + 1 : 0} -{' '}
          {Math.min(currentPage * jobsPerPage, totalJobs)} of {totalJobs} jobs
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Jobs Grid */}
          <div className="max-w-7xl mx-auto mb-8">
            {jobs.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {jobs.map(job => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                  No jobs found matching your criteria
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2 bg-[#ff6900] hover:bg-[#e55f00] text-white rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Previous Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 text-[#ff6900] dark:text-[#ff9346] border border-[#ff9346] hover:bg-[#fff3ea] dark:hover:bg-gray-700'
                }`}
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;

                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        className={`w-10 h-10 rounded-lg transition-colors ${
                          currentPage === pageNumber
                            ? 'bg-[#ff6900] text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-[#fff3ea] dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <span key={pageNumber} className="text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-800 text-[#ff6900] dark:text-[#ff9346] border border-[#ff9346] hover:bg-[#fff3ea] dark:hover:bg-gray-700'
                }`}
              >
                Next
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllJobs;
