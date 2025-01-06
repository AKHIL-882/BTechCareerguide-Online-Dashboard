import React, { useState, useEffect } from "react";
import { FaAngleDoubleUp } from "react-icons/fa"; // Import the up arrow icon from react-icons

const ScrollToTopButton = ({ colorcode }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Detect scroll position
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className={`${colorcode} fixed bottom-2 right-2 p-2 rounded-full  text-white border-0 cursor-pointer flex justify-center items-center shadow-lg z-50`}
      >
        <FaAngleDoubleUp size={20} />
      </button>
    )
  );
};

export default ScrollToTopButton;
