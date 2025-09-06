import React, { useState, useRef, useEffect } from "react";
import ProfileDropdown from "./ProfileDropdown";
import ProfileModal from "./ProfileModal";

const UserProfile = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        src="https://i.pravatar.cc/40"
        alt="Profile"
        className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <ProfileDropdown
          onClose={() => setIsOpen(false)}
          onViewProfile={() => {
            setIsProfileModalOpen(true);
            setIsOpen(false);
          }}
          handleLogout={handleLogout}
        />
      )}

      {isProfileModalOpen && (
        <ProfileModal onClose={() => setIsProfileModalOpen(false)} />
      )}
    </div>
  );
};

export default UserProfile;
