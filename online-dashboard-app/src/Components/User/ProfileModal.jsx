import React, { useState } from "react";
import { Upload, Save, X } from "lucide-react";
import ReactDOM from "react-dom";

const ProfileModal = ({ onClose }) => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@email.com",
      phone: "+1 9876543210",
      education: "B.Tech in Computer Science, 2023",
      year: "Final Year",
      experience: "0-1 years (Fresher)",
      status: "Fresher", // Fresher or Experienced
      location: "New York, USA",
      memberSince: "Jan 2023",
      avatar: "https://i.pravatar.cc/150",
      resume: null,
    },
  ]);

  const [profile, setProfile] = useState(profiles[0]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const avatarUrl = URL.createObjectURL(e.target.files[0]);
      setProfile({ ...profile, avatar: avatarUrl });
    }
  };

  const handleResumeUpload = (e) => {
    setProfile({ ...profile, resume: e.target.files[0] });
  };

  const handleStatusChange = (e) => {
    setProfile({ ...profile, status: e.target.value });
  };

  const handleSave = () => {
    const updated = profiles.map((p) => (p.id === profile.id ? profile : p));
    setProfiles(updated);
    onClose(); // close modal after save
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-2">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border mb-3"
          />
          <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer text-gray-600 hover:border-purple-500 hover:text-purple-600">
            <Upload size={16} className="mr-2" />
            Change Photo
            <input
              type="file"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        {/* Profile details with 2-column responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Full Name */}
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
            />
          </div>

          {/* Education */}
          <div>
            <label className="block font-medium">Education</label>
            <input
              type="text"
              name="education"
              value={profile.education}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
            />
          </div>

          {/* Fresher / Experienced */}
          <div>
            <label className="block font-medium">Status</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="status"
                  value="Fresher"
                  checked={profile.status === "Fresher"}
                  onChange={handleStatusChange}
                />
                Fresher
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="status"
                  value="Experienced"
                  checked={profile.status === "Experienced"}
                  onChange={handleStatusChange}
                />
                Experienced
              </label>
            </div>
          </div>

          {/* Conditionally show Year or Experience */}
          {profile.status === "Fresher" ? (
            <div>
              <label className="block font-medium">Year</label>
              <input
                type="text"
                name="year"
                value={profile.year}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
              />
            </div>
          ) : (
            <div>
              <label className="block font-medium">Experience</label>
              <input
                type="text"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 rounded-lg border bg-white"
              />
            </div>
          )}

          {/* Resume */}
          <div className="md:col-span-2">
            <label className="block font-medium">Resume</label>
            <label className="flex items-center justify-center mt-1 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer text-gray-600 hover:border-purple-500 hover:text-purple-600">
              <Upload size={16} className="mr-2" />
              {profile.resume ? profile.resume.name : "Choose file"}
              <input
                type="file"
                className="hidden"
                onChange={handleResumeUpload}
              />
            </label>
          </div>
        </div>
        {/* Member Since */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-400">
            👤 Member since: {profile.memberSince}
          </p>
          <button
            onClick={handleSave}
            className="flex items-center px-3 py-1 rounded-lg text-sm bg-purple-100 text-purple-700 hover:bg-purple-200"
          >
            <Save size={16} className="mr-1" /> Save
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ProfileModal;
