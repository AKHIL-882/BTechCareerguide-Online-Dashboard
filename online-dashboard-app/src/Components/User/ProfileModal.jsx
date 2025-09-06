import React from "react";

const ProfileModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <div className="flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border mb-3"
          />
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-500">johndoe@email.com</p>
          <div className="mt-4 text-sm text-gray-600">
            <p>📍 Location: New York, USA</p>
            <p>👤 Member since: Jan 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
