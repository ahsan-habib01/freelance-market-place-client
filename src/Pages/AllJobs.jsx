import { useEffect, useState, useRef, useCallback } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loading from '../Components/Loading/Loading';
import JobCard from '../Components/JobCard/JobCard';
import { Search, Filter, Loader } from 'lucide-react';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const { loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const observerTarget = useRef(null);

  const jobsPerPage = 12;

  // Fetch jobs function
  const fetchJobs = useCallback(
    async (page, reset = false) => {
      try {
        if (reset) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        // Build query parameters
        const params = new URLSearchParams({
          page: page.toString(),
          limit: jobsPerPage.toString(),
          sort: sortOrder,
        });

        if (searchTerm) params.append('search', searchTerm);
        if (categoryFilter) params.append('category', categoryFilter);
        if (locationFilter) params.append('location', locationFilter);

        const res = await axiosSecure.get(`/jobs?${params.toString()}`);
        const newJobs = res.data.jobs || res.data;
        const total = res.data.total || res.data.length;

        if (reset) {
          setJobs(newJobs);
        } else {
          setJobs(prev => [...prev, ...newJobs]);
        }

        setTotalJobs(total);

        // Check if there are more jobs to load
        const loadedCount = reset
          ? newJobs.length
          : jobs.length + newJobs.length;
        setHasMore(loadedCount < total);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        if (reset) {
          setJobs([]);
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [
      sortOrder,
      searchTerm,
      categoryFilter,
      locationFilter,
      axiosSecure,
      jobs.length,
    ]
  );

  // Initial load and filter changes
  useEffect(() => {
    setCurrentPage(1);
    setJobs([]);
    fetchJobs(1, true);
  }, [sortOrder, searchTerm, categoryFilter, locationFilter]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isLoadingMore &&
          !isLoading
        ) {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          fetchJobs(nextPage, false);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore, isLoading, currentPage, fetchJobs]);

  const handleSearch = e => {
    e.preventDefault();
    setCurrentPage(1);
    setJobs([]);
    fetchJobs(1, true);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setLocationFilter('');
    setCurrentPage(1);
    setJobs([]);
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
              onChange={e => setCategoryFilter(e.target.value)}
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
              onChange={e => setLocationFilter(e.target.value)}
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
          Showing {jobs.length} of {totalJobs} jobs
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
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

          {/* Loading More Indicator */}
          {isLoadingMore && (
            <div className="flex justify-center items-center py-8">
              <Loader className="w-8 h-8 text-[#ff6900] dark:text-[#ff9346] animate-spin" />
              <span className="ml-3 text-gray-600 dark:text-gray-400">
                Loading more jobs...
              </span>
            </div>
          )}

          {/* End of Results Message */}
          {!hasMore && jobs.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
                You've reached the end of the list
              </p>
            </div>
          )}

          {/* Intersection Observer Target */}
          <div ref={observerTarget} className="h-10"></div>
        </>
      )}
    </div>
  );
};

export default AllJobs;
