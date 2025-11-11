import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AddJob = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleAddJob = async e => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const summary = form.summary.value;
    const coverImage = form.coverImage.value;
    const postedBy = user?.displayName || 'Anonymous';
    const userEmail = user?.email;
    const postedAt = new Date().toISOString();

    const newJob = {
      title,
      category,
      summary,
      coverImage,
      postedBy,
      userEmail,
      postedAt,
    };

    try {
      const { data } = await axiosSecure.post('/jobs', newJob);
      if (data?.insertedId) {
        toast.success('Job added successfully!');
        form.reset();
      } else {
        toast.error('Failed to add job.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5ec] via-[#fff0e5] to-[#ffebe0] dark:from-[#0f1116] dark:via-[#14181f] dark:to-[#1a1f27] flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl shadow-[0_0_30px_-10px_rgba(255,105,0,0.3)] border border-white/10 p-8">
        <h2 className="text-4xl font-bold text-center text-[#ff6900] dark:text-[#ff9346] mb-3">
          Post a New Job
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Fill in the details below to post your freelance opportunity.
        </p>

        <form onSubmit={handleAddJob} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Design a landing page for a startup"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-[#ff9346] focus:outline-none"
            />
          </div>

          {/* Posted By */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
              Posted By
            </label>
            <input
              type="text"
              value={user?.displayName || 'Anonymous'}
              readOnly
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
              Category
            </label>
            <select
              name="category"
              required
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-[#ff9346] focus:outline-none"
            >
              <option value="">Select category</option>
              <option>Web Development</option>
              <option>Graphics Design</option>
              <option>3D Modeling</option>
              <option>Digital Marketing</option>
              <option>Content Writing</option>
              <option>Video Editing</option>
            </select>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
              Summary
            </label>
            <textarea
              name="summary"
              rows="3"
              required
              placeholder="Short description about the job..."
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-[#ff9346] focus:outline-none"
            ></textarea>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
              Cover Image URL
            </label>
            <input
              type="url"
              name="coverImage"
              required
              placeholder="Paste image URL"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-[#ff9346] focus:outline-none"
            />
          </div>

          {/* User Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              value={user?.email || 'Anonymous'}
              readOnly
              className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 font-semibold rounded-lg text-white bg-gradient-to-r from-[#ff9346] to-[#ff6900] hover:shadow-lg hover:shadow-[#ff6900]/40 transition-all duration-300 disabled:opacity-70"
          >
            {loading ? 'Posting...' : 'Add Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
