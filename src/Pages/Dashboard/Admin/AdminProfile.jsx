import React, { use, useState, useEffect } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  FiEdit2,
  FiSave,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
} from 'react-icons/fi';

const API_URL = 'https://freelify-market-place-server.vercel.app';

const AdminProfile = () => {
  const { user, profileUpdate } = use(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    photoURL: '',
    bio: '',
    phone: '',
    location: '',
    skills: [],
  });
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}/users/profile/${user?.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfileData({
        name: response.data.name || '',
        email: response.data.email || '',
        photoURL: response.data.photoURL || '',
        bio: response.data.bio || '',
        phone: response.data.phone || '',
        location: response.data.location || '',
        skills: response.data.skills || [],
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !profileData.skills.includes(skillInput.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = skillToRemove => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `${API_URL}/users/profile/${user?.email}`,
        {
          name: profileData.name,
          photoURL: profileData.photoURL,
          bio: profileData.bio,
          phone: profileData.phone,
          location: profileData.location,
          skills: profileData.skills,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await profileUpdate(profileData.name, profileData.photoURL);

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    fetchProfile();
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            Admin Profile
            <span className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full flex items-center gap-1">
              <FiShield size={14} />
              Admin
            </span>
          </h1>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#ff6f3c] text-white rounded-lg hover:bg-[#ff9346] transition"
          >
            <FiEdit2 />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
            >
              <FiSave />
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              <FiX />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Cover Image - Purple gradient for admin */}
        <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600"></div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="flex items-end -mt-16 mb-4">
            <div className="relative">
              <img
                src={profileData.photoURL || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-purple-600 p-2 rounded-full border-2 border-white dark:border-gray-800">
                <FiShield className="text-white" size={16} />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Name & Photo URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white text-lg font-semibold">
                    {profileData.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <p className="text-gray-900 dark:text-white text-lg flex items-center gap-2">
                  <FiMail className="text-purple-600" />
                  {profileData.email}
                </p>
              </div>
            </div>

            {/* Photo URL */}
            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="photoURL"
                  value={profileData.photoURL}
                  onChange={handleInputChange}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            )}

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Tell us about yourself..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  {profileData.bio || 'No bio added yet'}
                </p>
              )}
            </div>

            {/* Phone & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    placeholder="+1234567890"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white flex items-center gap-2">
                    <FiPhone className="text-purple-600" />
                    {profileData.phone || 'Not provided'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white flex items-center gap-2">
                    <FiMapPin className="text-purple-600" />
                    {profileData.location || 'Not provided'}
                  </p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills
              </label>
              {isEditing && (
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Add a skill..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Add
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {profileData.skills.length > 0 ? (
                  profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-red-500"
                        >
                          <FiX size={16} />
                        </button>
                      )}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No skills added yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
