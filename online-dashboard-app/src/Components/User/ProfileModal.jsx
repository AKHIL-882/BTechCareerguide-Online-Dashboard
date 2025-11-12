import React, { useState } from "react";
import ReactDOM from "react-dom";
import ProfileView from "./ProfileView";
import ProfileEdit from "./ProfileEdit";

const ProfileModal = ({ onClose }) => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@email.com",
      phone: "+1 9876543210",
      degree: "B.Tech",
      branch: "Computer Science",
      year: "Final Year",
      experience: "0-1 years (Fresher)",
      status: "Fresher",
      location: "New York, USA",
      memberSince: "Jan 2023",
      avatar: "https://i.pravatar.cc/150",
      resume: null,
      skills: ["React", "Node.js", "UI/UX", "JavaScript", "MongoDB"],
    },
  ]);

  const [profile, setProfile] = useState(profiles[0]);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedProfile) => {
    const updated = profiles.map((p) =>
      p.id === updatedProfile.id ? updatedProfile : p,
    );
    setProfiles(updated);
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-2">
      <div className="bg-white dark:bg-gray-900 text-slate-900 dark:text-slate-100 w-full max-w-lg rounded-2xl shadow-xl p-6 relative max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-800">
        {!isEditing ? (
          <ProfileView
            profile={profile}
            onEdit={() => setIsEditing(true)}
            onClose={onClose}
          />
        ) : (
          <ProfileEdit
            profile={profile}
            onCancel={() => setIsEditing(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default ProfileModal;
