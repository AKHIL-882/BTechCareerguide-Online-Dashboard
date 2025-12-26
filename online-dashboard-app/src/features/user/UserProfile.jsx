import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import UserTestimonials from "./UserTestimonials"; // import popup

const UserProfile = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false); // dY"1 new state
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
            navigate("/profile");
            setIsOpen(false);
          }}
          onSendFeedback={() => {
            setIsFeedbackOpen(true); // dY"1 open feedback modal
            setIsOpen(false);
          }}
          handleLogout={handleLogout}
        />
      )}

      {isFeedbackOpen && (
        <UserTestimonials onClose={() => setIsFeedbackOpen(false)} />
      )}
    </div>
  );
};

export default UserProfile;
