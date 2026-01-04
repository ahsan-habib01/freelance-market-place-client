import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import {
  Briefcase,
  DollarSign,
  Clock,
  MapPin,
  Users,
  Calendar,
  Tag,
  X,
} from 'lucide-react';

const AddJob = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  // Handle skill tags
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

  // Handle form submission
  const handleAddJob = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;

    const jobData = {
      // Basic Info
      title: form.title.value,
      category: form.category.value,
      summary: form.summary.value,
      description: form.description.value,

      // Financial
      budgetType: form.budgetType.value,
      budgetMin: parseFloat(form.budgetMin.value) || 0,
      budgetMax: parseFloat(form.budgetMax.value) || 0,
      currency: form.currency.value,

      // Timeline
      duration: form.duration.value,
      durationUnit: form.durationUnit.value,
      deadline: form.deadline.value,

      // Requirements
      experienceLevel: form.experienceLevel.value,
      skills: skills,
      numberOfPositions: parseInt(form.numberOfPositions.value) || 1,

      // Location & Work Type
      locationType: form.locationType.value,
      location: form.location.value,
      workingHours: form.workingHours.value,

      // Additional Info
      language: form.language.value,
      coverImage: form.coverImage.value,

      // Auto-filled
      postedBy: user?.displayName || user?.name || 'Anonymous',
      userEmail: user?.email,
      postedAt: new Date().toISOString(),
      status: 'open',
      applicants: 0,
    };

    try {
      const response = await axiosSecure.post('/jobs', jobData);

      if (response.data.insertedId) {
        toast.success('Job posted successfully!');
        navigate('/dashboard/my-jobs');
      }
    } catch (error) {
      console.error('Add job error:', error);
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen py-16 px-4 bg-gradient-to-br from-[#ffebe0] via-[#fff0e5] to-[#fff5ec] dark:from-gray-800 dark:via-[#14181f] dark:to-[#1a1f27]">
      <title>Add New Job - Freelify</title>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white/90 dark:bg-[#121212] shadow-2xl rounded-3xl p-8 md:p-12 border border-[#ff9346]/20 backdrop-blur-sm"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#ff9346] to-[#ff6900] rounded-full mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#ff9346] to-[#ff6900] bg-clip-text text-transparent mb-2">
            Post a New Job
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Fill in the details to attract the best freelancers
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAddJob} className="space-y-8">
          {/* SECTION 1: Basic Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-[#ff9346]/30 pb-2">
              <Briefcase className="w-5 h-5 text-[#ff6900]" />
              Basic Information
            </h3>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Build a Responsive E-commerce Website"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
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
                <option value="3D Modeling">3D Modeling</option>
                <option value="SEO Services">SEO Services</option>
                <option value="Translation">Translation</option>
                <option value="Virtual Assistant">Virtual Assistant</option>
              </select>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Summary *
              </label>
              <input
                type="text"
                name="summary"
                placeholder="Brief one-line description (max 100 characters)"
                maxLength="100"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              />
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Detailed Description *
              </label>
              <textarea
                name="description"
                rows="6"
                placeholder="Provide a detailed description of the job, requirements, deliverables, etc."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              ></textarea>
            </div>
          </div>

          {/* SECTION 2: Budget & Payment */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-[#ff9346]/30 pb-2">
              <DollarSign className="w-5 h-5 text-[#ff6900]" />
              Budget & Payment
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Budget Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget Type *
                </label>
                <select
                  name="budgetType"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                  required
                >
                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly Rate</option>
                  <option value="range">Budget Range</option>
                </select>
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency *
                </label>
                <select
                  name="currency"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                  required
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="BDT">BDT - Bangladeshi Taka</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                </select>
              </div>

              {/* Minimum Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Budget *
                </label>
                <input
                  type="number"
                  name="budgetMin"
                  min="0"
                  step="0.01"
                  placeholder="e.g., 500"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                  required
                />
              </div>

              {/* Maximum Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maximum Budget *
                </label>
                <input
                  type="number"
                  name="budgetMax"
                  min="0"
                  step="0.01"
                  placeholder="e.g., 1500"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Timeline */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-[#ff9346]/30 pb-2">
              <Clock className="w-5 h-5 text-[#ff6900]" />
              Timeline & Duration
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Project Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration *
                </label>
                <input
                  type="number"
                  name="duration"
                  min="1"
                  placeholder="e.g., 2"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                  required
                />
              </div>

              {/* Duration Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration Unit *
                </label>
                <select
                  name="durationUnit"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                  required
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>

              {/* Application Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Application Deadline *
                </label>
                <input
                  type="date"
                  name="deadline"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Requirements */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-[#ff9346]/30 pb-2">
              <Tag className="w-5 h-5 text-[#ff6900]" />
              Requirements & Skills
            </h3>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Experience Level *
              </label>
              <select
                name="experienceLevel"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              >
                <option value="beginner">Beginner - Entry Level</option>
                <option value="intermediate">
                  Intermediate - Some Experience
                </option>
                <option value="expert">Expert - Advanced Level</option>
              </select>
            </div>

            {/* Skills Required */}
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
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-6 py-3 bg-[#ff6900] hover:bg-[#e55f00] text-white rounded-xl font-medium transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Skill Tags */}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff9346]/20 text-[#ff6900] dark:bg-[#ff9346]/10 dark:text-[#ff9346] rounded-full text-sm font-medium"
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

            {/* Number of Positions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Positions *
              </label>
              <input
                type="number"
                name="numberOfPositions"
                min="1"
                defaultValue="1"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* SECTION 5: Location & Work Type */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-[#ff9346]/30 pb-2">
              <MapPin className="w-5 h-5 text-[#ff6900]" />
              Location & Work Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Location Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Work Location *
                </label>
                <select
                  name="locationType"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                  required
                >
                  <option value="Remote">Remote (Work from anywhere)</option>
                  <option value="On-site">On-site (Physical location)</option>
                  <option value="Hybrid">Hybrid (Mix of both)</option>
                </select>
              </div>

              {/* Specific Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  City/Country *
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., New York, USA or Worldwide"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                  required
                />
              </div>

              {/* Working Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Working Hours *
                </label>
                <select
                  name="workingHours"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Flexible">Flexible</option>
                  <option value="Project-based">Project-based</option>
                </select>
              </div>

              {/* Preferred Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Language *
                </label>
                <select
                  name="language"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                  required
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Arabic">Arabic</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 6: Media */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-[#ff9346]/30 pb-2">
              <Calendar className="w-5 h-5 text-[#ff6900]" />
              Cover Image
            </h3>

            {/* Cover Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Image URL *
              </label>
              <input
                type="url"
                name="coverImage"
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Recommended size: 1200x630px. Use high-quality images for better
                visibility.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 font-bold text-lg text-white rounded-xl bg-gradient-to-r from-[#ff9346] to-[#ff6900] shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
