import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading/Loading';
import useAuth from '../Hooks/useAuth';

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
      .catch(err => {
        console.error(err);
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
            confirmButtonColor: '#22c55e',
          });
          navigate('/myAddedJobs');
        } else {
          Swal.fire('No Change', 'No fields were updated.', 'info');
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire('Error!', 'Failed to update job.', 'error');
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-4xl font-bold text-center text-green-700 dark:text-green-400 mb-10">
          Update Job
        </h2>

        <form onSubmit={handleUpdateJob} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={job?.title}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              defaultValue={job?.category}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-400 focus:outline-none"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Summary
            </label>
            <textarea
              name="summary"
              defaultValue={job?.summary}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-400 focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverImage"
              defaultValue={job?.coverImage}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
