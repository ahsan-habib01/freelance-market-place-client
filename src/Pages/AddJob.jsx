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

    // axiosSecure.post('/jobs', newJob).then(data => {
    //   console.log('after secure call', data.data);
    // });

    try {
      const { data } = await axiosSecure.post('/jobs', newJob);

      if (data?.insertedId) {
        toast.success('✅ Job added successfully!');
        form.reset();
      } else {
        toast.error('Failed to add job.');
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-gray-900 flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Post a New Job
        </h2>

        <form onSubmit={handleAddJob} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-200 mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Design a landing page for a startup"
              className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Posted By */}
          <div>
            <label className="block text-gray-200 mb-1">Posted By</label>
            <input
              type="text"
              value={user?.displayName || 'Anonymous'}
              readOnly
              className="w-full p-3 rounded-lg bg-gray-200 text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-200 mb-1">Category</label>
            <select
              name="category"
              required
              className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Web Development">Select category</option>
              <option>Web Development</option>
              <option>Graphics Design</option>
              <option>Digital Marketing</option>
              <option>Content Writing</option>
              <option>Video Editing</option>
            </select>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-gray-200 mb-1">Summary</label>
            <textarea
              name="summary"
              rows="3"
              required
              placeholder="Short description about the job..."
              className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-gray-200 mb-1">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              required
              placeholder="Paste image URL"
              className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* User Email */}
          <div>
            <label className="block text-gray-200 mb-1">Email</label>
            <input
              type="email"
              value={user?.email || 'Anonymous'}
              readOnly
              className="w-full p-3 rounded-lg bg-gray-200 text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition font-semibold text-white py-3 rounded-lg"
          >
            {loading ? 'Posting...' : 'Add Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
