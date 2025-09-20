import React from "react";
import { Upload, Edit2 } from "lucide-react";

const ProfileView = ({ profile, onEdit, onClose }) => {
  return (
    <div className="relative">
      {/* Banner */}
      <div className="h-24 w-full rounded-t-2xl bg-gradient-to-r from-purple-500 to-pink-500 relative">
        {/* Avatar + Name + Edit Row */}
        <div className="absolute -bottom-10 w-full flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <h2 className="text-lg font-bold text-gray-700 drop-shadow mt-8">
              {profile.name}
            </h2>
          </div>

          <button
            onClick={onEdit}
            className="flex items-center px-3 py-1 rounded-full text-sm bg-white text-purple-600 hover:bg-purple-100 shadow mt-8"
          >
            <Edit2 size={14} className="mr-1" /> Edit
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-12 pb-4 px-6 text-center">
        <div className="flex justify-around items-center text-gray-600 text-sm mt-1">
          <p>{profile.phone}</p>
          <p>{profile.email}</p>
          <p>{profile.location}</p>
        </div>

        {/* Education / Experience */}
        <div className="mt-3 text-sm">
          {profile.status === "Fresher" ? (
            <p className="text-purple-700 font-medium">
              🎓 {profile.degree}, {profile.branch}, {profile.year}
            </p>
          ) : (
            <p className="text-purple-700 font-medium">
              💼 {profile.experience}
            </p>
          )}
        </div>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {profile.skills?.slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
            >
              #{skill}
            </span>
          ))}
        </div>

        {/* Resume */}
        <div className="mt-4">
          {profile.resume ? (
            <a
              href={URL.createObjectURL(profile.resume)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-sm text-purple-600 hover:underline"
            >
              <Upload size={14} className="mr-1" /> View Resume
            </a>
          ) : (
            <p className="text-gray-400 text-sm">📄 No resume uploaded</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
          <span>👤 Member since: {profile.memberSince}</span>
          <button
            onClick={onClose}
            className="px-4 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 shadow"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
