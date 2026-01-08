import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Briefcase,
  DollarSign,
  Clock,
  MapPin,
  Tag,
  Calendar,
  X,
} from 'lucide-react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AddJob = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = skillToRemove => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleAddJob = async e => {
    e.preventDefault();

    // ✅ Prevent double submission
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const form = e.target;

    // ✅ Client-side validation
    const title = form.title.value.trim();
    const category = form.category.value;
    const description = form.description.value.trim();

    if (!title || !category || !description) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    const jobData = {
      // Basic Info
      title,
      category,
      summary: form.summary.value.trim(),
      description,

      // Financial
      budgetType: form.budgetType.value,
      budgetMin: parseFloat(form.budgetMin.value) || 0,
      budgetMax: parseFloat(form.budgetMax.value) || 0,
      currency: form.currency.value,

      // Timeline
      duration: parseInt(form.duration.value) || 0,
      durationUnit: form.durationUnit.value,
      deadline: form.deadline.value,

      // Requirements
      experienceLevel: form.experienceLevel.value,
      skills: skills,
      numberOfPositions: parseInt(form.numberOfPositions.value) || 1,

      // Location & Work Type
      locationType: form.locationType.value,
      location: form.location.value.trim(),
      workingHours: form.workingHours.value,

      // Additional Info
      language: form.language.value,
      coverImage: form.coverImage.value.trim(),

      // Metadata (postedBy for display purposes)
      postedBy: user?.displayName || user?.name || 'Anonymous',
      status: 'open',
      applicants: 0,

      // ✅ DO NOT SEND: postedAt, createdAt, userEmail
      // Server will handle these automatically
    };

    console.log('📤 Submitting job data:', {
      title: jobData.title,
      category: jobData.category,
      hasSkills: jobData.skills.length > 0,
    });

    try {
      const response = await axiosSecure.post('/jobs', jobData);

      console.log('✅ Server response:', response.data);

      // ✅ Check for successful creation
      if (response.data.success && response.data.insertedId) {
        toast.success('🎉 Job posted successfully!');

        // ✅ Navigate to user's jobs page
        setTimeout(() => {
          navigate('/dashboard/my-jobs');
        }, 500);
      } else if (response.data.insertedId) {
        // Fallback for older API format
        toast.success('Job posted successfully!');
        navigate('/dashboard/my-jobs');
      } else {
        throw new Error('Job creation failed');
      }
    } catch (error) {
      console.error('❌ Add job error:', error);

      // ✅ Detailed error handling
      if (error.response) {
        const errorMsg = error.response.data?.message || 'Failed to post job';
        toast.error(errorMsg);
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        toast.error('Network error. Please check your connection.');
        console.error('Network error:', error.request);
      } else {
        toast.error('An unexpected error occurred');
        console.error('Error:', error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen py-16 px-4 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
            Post a New Job
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Fill in the details to attract the best freelancers
          </p>
        </div>

        <form onSubmit={handleAddJob} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-orange-300 dark:border-orange-700 pb-2">
              <Briefcase className="w-5 h-5 text-orange-600" />
              Basic Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Build a Responsive E-commerce Website"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              >
                <option value="">Select a category</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Video Editing">Video Editing</option>
                <option value="Data Entry">Data Entry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Summary *
              </label>
              <input
                type="text"
                name="summary"
                placeholder="Brief description (max 100 characters)"
                maxLength="100"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Detailed Description *
              </label>
              <textarea
                name="description"
                rows="6"
                placeholder="Detailed job description"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              ></textarea>
            </div>
          </div>

          {/* Budget & Payment */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-orange-300 dark:border-orange-700 pb-2">
              <DollarSign className="w-5 h-5 text-orange-600" />
              Budget & Payment
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget Type *
                </label>
                <select
                  name="budgetType"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                >
                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly Rate</option>
                  <option value="range">Budget Range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency *
                </label>
                <select
                  name="currency"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="BDT">BDT - Bangladeshi Taka</option>
                  <option value="INR">INR - Indian Rupee</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Budget *
                </label>
                <input
                  type="number"
                  name="budgetMin"
                  min="0"
                  step="0.01"
                  placeholder="500"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maximum Budget *
                </label>
                <input
                  type="number"
                  name="budgetMax"
                  min="0"
                  step="0.01"
                  placeholder="1500"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-orange-300 dark:border-orange-700 pb-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Timeline & Duration
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration *
                </label>
                <input
                  type="number"
                  name="duration"
                  min="1"
                  placeholder="2"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration Unit *
                </label>
                <select
                  name="durationUnit"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Application Deadline *
                </label>
                <input
                  type="date"
                  name="deadline"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-orange-300 dark:border-orange-700 pb-2">
              <Tag className="w-5 h-5 text-orange-600" />
              Requirements & Skills
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Experience Level *
              </label>
              <select
                name="experienceLevel"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              >
                <option value="beginner">Beginner - Entry Level</option>
                <option value="intermediate">
                  Intermediate - Some Experience
                </option>
                <option value="expert">Expert - Advanced Level</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Required Skills
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a skill and press Enter"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-colors"
                >
                  Add
                </button>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Positions *
              </label>
              <input
                type="number"
                name="numberOfPositions"
                min="1"
                defaultValue="1"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-orange-300 dark:border-orange-700 pb-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              Location & Work Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Work Location *
                </label>
                <select
                  name="locationType"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City/Country *
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="New York, USA or Worldwide"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Working Hours *
                </label>
                <select
                  name="workingHours"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Flexible">Flexible</option>
                  <option value="Project-based">Project-based</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Language *
                </label>
                <select
                  name="language"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-orange-300 dark:border-orange-700 pb-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Cover Image
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image URL *
              </label>
              <input
                type="url"
                name="coverImage"
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Recommended size: 1200x630px
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 font-bold text-lg text-white rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Posting Job...
              </span>
            ) : (
              'Post Job'
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default AddJob;
