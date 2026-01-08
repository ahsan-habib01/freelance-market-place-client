import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading/Loading';
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

const UpdateJob = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, loading, setLoading } = useAuth();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch existing job data
  useEffect(() => {
    axiosSecure
      .get(`/jobs/${id}`)
      .then(res => {
        setJob(res.data);
        setSkills(res.data.skills || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        Swal.fire('Error!', 'Failed to load job details.', 'error');
        setLoading(false);
      });
  }, [id, axiosSecure, setLoading]);

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

  const handleUpdateJob = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;

    const updatedJob = {
      title: form.title.value,
      category: form.category.value,
      summary: form.summary.value,
      description: form.description.value,
      budgetType: form.budgetType.value,
      budgetMin: parseFloat(form.budgetMin.value) || 0,
      budgetMax: parseFloat(form.budgetMax.value) || 0,
      currency: form.currency.value,
      duration: form.duration.value,
      durationUnit: form.durationUnit.value,
      deadline: form.deadline.value,
      experienceLevel: form.experienceLevel.value,
      skills: skills,
      numberOfPositions: parseInt(form.numberOfPositions.value) || 1,
      locationType: form.locationType.value,
      location: form.location.value,
      workingHours: form.workingHours.value,
      language: form.language.value,
      coverImage: form.coverImage.value,
    };

    try {
      const response = await axiosSecure.put(`/updateJob/${id}`, updatedJob);
      console.log(response)

      if (response.data.data.modifiedCount > 0) {
        toast.success('Job updated successfully!');
        navigate(`/all-jobs/${id}`);
        console.log('object');

      } else {
        toast('No changes detected.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to update job');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !job) return <Loading />;

  return (
    <section className="min-h-screen py-16 px-4 bg-gradient-to-br from-[#ffebe0] via-[#fff0e5] to-[#fff5ec] dark:from-gray-800 dark:via-[#14181f] dark:to-[#1a1f27]">
      <title>Update Job - Freelify</title>

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
            Update Job
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Edit job details and update the post
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdateJob} className="space-y-8">
          {/* SECTION 1: Basic Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-[#ff9346]/30 pb-2">
              <Briefcase className="w-5 h-5 text-[#ff6900]" /> Basic Information
            </h3>

            <input
              type="text"
              name="title"
              defaultValue={job.title}
              placeholder="Job Title"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            />

            <select
              name="category"
              defaultValue={job.category}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            >
              <option>Web Development</option>
              <option>Mobile Development</option>
              <option>UI/UX Design</option>
              <option>Graphic Design</option>
              <option>Digital Marketing</option>
              <option>Content Writing</option>
              <option>Video Editing</option>
              <option>Data Entry</option>
              <option>3D Modeling</option>
              <option>SEO Services</option>
              <option>Translation</option>
              <option>Virtual Assistant</option>
            </select>

            <input
              type="text"
              name="summary"
              defaultValue={job.summary}
              placeholder="Short Summary"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            />

            <textarea
              name="description"
              rows="6"
              defaultValue={job.description}
              placeholder="Detailed Description"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            ></textarea>
          </div>

          {/* SECTION 2: Budget */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-[#ff9346]/30 pb-2">
              <DollarSign className="w-5 h-5 text-[#ff6900]" /> Budget & Payment
            </h3>

            <div className="grid md:grid-cols-4 gap-6">
              <select
                name="budgetType"
                defaultValue={job.budgetType}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              >
                <option value="fixed">Fixed Price</option>
                <option value="hourly">Hourly Rate</option>
                <option value="range">Budget Range</option>
              </select>

              <select
                name="currency"
                defaultValue={job.currency}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="BDT">BDT</option>
                <option value="INR">INR</option>
                <option value="CAD">CAD</option>
                <option value="AUD">AUD</option>
              </select>

              <input
                type="number"
                name="budgetMin"
                defaultValue={job.budgetMin}
                min="0"
                step="0.01"
                placeholder="Min Budget"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              />

              <input
                type="number"
                name="budgetMax"
                defaultValue={job.budgetMax}
                min="0"
                step="0.01"
                placeholder="Max Budget"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* SECTION 3: Timeline */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-[#ff9346]/30 pb-2">
              <Clock className="w-5 h-5 text-[#ff6900]" /> Timeline & Duration
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <input
                type="number"
                name="duration"
                defaultValue={job.duration}
                min="1"
                placeholder="Duration"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              />

              <select
                name="durationUnit"
                defaultValue={job.durationUnit}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>

              <input
                type="date"
                name="deadline"
                defaultValue={job.deadline?.split('T')[0]}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* SECTION 4: Skills & Requirements */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-[#ff9346]/30 pb-2">
              <Tag className="w-5 h-5 text-[#ff6900]" /> Requirements & Skills
            </h3>

            <select
              name="experienceLevel"
              defaultValue={job.experienceLevel}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>

            <div>
              <input
                type="text"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a skill and press Enter"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all mb-2"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-6 py-3 bg-[#ff6900] hover:bg-[#e55f00] text-white rounded-xl font-medium transition-colors mb-4"
              >
                Add Skill
              </button>

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
            </div>

            <input
              type="number"
              name="numberOfPositions"
              defaultValue={job.numberOfPositions}
              min="1"
              placeholder="Number of Positions"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            />
          </div>

          {/* SECTION 5: Location & Work */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-[#ff9346]/30 pb-2">
              <MapPin className="w-5 h-5 text-[#ff6900]" /> Location & Work
            </h3>

            <select
              name="locationType"
              defaultValue={job.locationType}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            >
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <input
              type="text"
              name="location"
              defaultValue={job.location}
              placeholder="City / Country"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            />

            <select
              name="workingHours"
              defaultValue={job.workingHours}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Flexible">Flexible</option>
              <option value="Project-based">Project-based</option>
            </select>

            <select
              name="language"
              defaultValue={job.language}
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

          {/* SECTION 6: Cover Image */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-[#ff9346]/30 pb-2">
              <Calendar className="w-5 h-5 text-[#ff6900]" /> Cover Image
            </h3>

            <input
              type="url"
              name="coverImage"
              defaultValue={job.coverImage}
              placeholder="Cover Image URL"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1c1c1c] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#ff9346] focus:outline-none transition-all"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 font-bold text-lg text-white rounded-xl bg-gradient-to-r from-[#ff9346] to-[#ff6900] shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Updating Job...
              </span>
            ) : (
              'Update Job'
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default UpdateJob;
