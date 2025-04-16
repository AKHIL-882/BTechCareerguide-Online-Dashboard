import React from "react";
import { FaTimes } from "react-icons/fa";
import scrollToSection from "./ScrollToSection";

const PopupNotification = ({ onClose, title }) => {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "Good Morning!";
    } else if (hours < 18) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 px-6 py-4 z-50 transition-all duration-300 animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
        {/* Text on top for smaller screens */}
        <p className="text-gray-700 font-medium text-center sm:text-left sm:order-first">
        <span className="bg-clip-text text-transparent bg-gradient-to-tr from-violet-500 to-green-500">{getGreeting()}</span> {title}
        </p>

        {/* Buttons below on smaller screens and side by side on larger screens */}
        <div className="flex flex-col sm:flex-row sm:gap-3 sm:justify-end items-center gap-3">
          <button
            onClick={() => {
              scrollToSection("home");
              onClose();
            }}
            className="bg-violet-600 text-white px-4 py-1 rounded-lg hover:bg-violet-700 transition w-full sm:w-auto"
          >
            Login
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-violet-500"
          >
            <FaTimes size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupNotification;

