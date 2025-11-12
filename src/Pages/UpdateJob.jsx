import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading/Loading';
import useAuth from '../Hooks/useAuth';
import { motion } from 'framer-motion';

const UpdateJob = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const { loading, setLoading } = useAuth();

  // ✅ Fetch job data by ID
  useEffect(() => {
    axiosSecure
      .get(`/jobs/${id}`)
      .then(res => {
        setJob(res.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire('Error!', 'Failed to load job details.', 'error');
      });
  }, [id, axiosSecure, setLoading]);

  // ✅ Handle Update
  const handleUpdateJob = e => {
    e.preventDefault();
    const form = e.target;
    const updatedJob = {
      title: form.title.value,
      category: form.category.value,
      summary: form.summary.value,
      coverImage: form.coverImage.value,
    };

    axiosSecure
      .put(`/updateJob/${id}`, updatedJob)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: 'Updated!',
            text: 'Job updated successfully!',
            icon: 'success',
            confirmButtonColor: '#ff6900',
          });
          navigate('/myAddedJobs');
        } else {
          Swal.fire('No Change', 'No fields were updated.', 'info');
        }
      })
      .catch(() => {
        Swal.fire('Error!', 'Failed to update job.', 'error');
      });
  };

  if (loading) return <Loading />;

  return (
    <section
      className="min-h-screen py-16 px-4 bg-gradient-to-br from-[#ffebe0] via-[#fff0e5] to-[#fff5ec]
        dark:from-gray-800 dark:via-[#14181f] dark:to-[#1a1f27]"
    >
      <title>Update Your Job - Freelify</title>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white/90 dark:bg-[#121212] shadow-2xl rounded-3xl p-10 border border-[#ff9346]/20 backdrop-blur-sm"
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#ff9346] to-[#ff6900] bg-clip-text text-transparent">
          Update Job
        </h2>

        {/* Form */}
        <form onSubmit={handleUpdateJob} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={job?.title}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              defaultValue={job?.category}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            >
              <option>Web Development</option>
              <option>Graphic Design</option>
              <option>3D Modeling</option>
              <option>Digital Marketing</option>
              <option>Content Writing</option>
              <option>Video Editing</option>
            </select>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Summary
            </label>
            <textarea
              name="summary"
              defaultValue={job?.summary}
              rows="4"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
            ></textarea>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverImage"
              defaultValue={job?.coverImage}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-[#ff9346] to-[#ff6900] shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300"
          >
            Save Changes
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default UpdateJob;
