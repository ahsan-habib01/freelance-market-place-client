import React, { useContext, useState, useEffect } from 'react';
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
} from 'react-icons/fi';

const API_URL = 'https://freelify-market-place-server.vercel.app';

const UserProfile = () => {
  const { user, profileUpdate } = useContext(AuthContext); // ✅ Fixed: use useContext
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
    if (user?.email) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching profile for:', user?.email);

      const response = await axios.get(
        `${API_URL}/users/profile/${user?.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Profile data received:', response.data);

      setProfileData({
        name: response.data.name || user?.displayName || '',
        email: response.data.email || user?.email || '',
        photoURL: response.data.photoURL || user?.photoURL || '',
        bio: response.data.bio || '',
        phone: response.data.phone || '',
        location: response.data.location || '',
        skills: response.data.skills || [],
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      console.error('Error details:', error.response?.data);
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
    console.log('Starting save process...');

    try {
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      console.log('Updating profile for:', user?.email);

      // Update backend first
      console.log('Sending data to backend:', profileData);
      const response = await axios.put(
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
      console.log('Backend update response:', response.data);

      // Update Firebase profile only if profileUpdate exists
      if (profileUpdate) {
        console.log('Updating Firebase profile...');
        await profileUpdate(profileData.name, profileData.photoURL);
        console.log('Firebase profile updated');
      } else {
        console.warn('profileUpdate function not available');
      }

      toast.success('Profile updated successfully!');
      setIsEditing(false);
      console.log('Save completed successfully');
    } catch (error) {
      console.error('Save failed:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error message:', error.message);

      // More specific error messages
      if (error.response?.status === 401) {
        toast.error('Unauthorized. Please login again.');
      } else if (error.response?.status === 404) {
        toast.error('Profile not found');
      } else if (error.message.includes('Network Error')) {
        toast.error('Network error. Check your connection.');
      } else {
        toast.error(
          error.response?.data?.message || 'Failed to update profile'
        );
      }
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    fetchProfile();
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Please login to view your profile
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>
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
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSave />
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
            >
              <FiX />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-[#ff6f3c] to-[#ff9346]"></div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="flex items-end -mt-16 mb-4">
            <img
              src={profileData.photoURL || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
              onError={e => {
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6f3c] dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white text-lg font-semibold">
                    {profileData.name || 'Not set'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <p className="text-gray-900 dark:text-white text-lg flex items-center gap-2">
                  <FiMail className="text-[#ff6f3c]" />
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6f3c] dark:bg-gray-700 dark:text-white"
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6f3c] dark:bg-gray-700 dark:text-white"
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6f3c] dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white flex items-center gap-2">
                    <FiPhone className="text-[#ff6f3c]" />
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6f3c] dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white flex items-center gap-2">
                    <FiMapPin className="text-[#ff6f3c]" />
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
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#ff6f3c] dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-[#ff6f3c] text-white rounded-lg hover:bg-[#ff9346] transition"
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
                      className="px-3 py-1 bg-[#ff6f3c]/10 text-[#ff6f3c] rounded-full text-sm font-medium flex items-center gap-2"
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

export default UserProfile;
