import React, { useState, useEffect } from 'react';
import {  FaAngleDoubleUp  } from 'react-icons/fa'; // Import the up arrow icon from react-icons

const ScrollToTopButton = () => {
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
      behavior: 'smooth', // Smooth scroll effect
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '8px',
          right: '10px',
          padding: '10px',
          borderRadius: '50%', // Fully circular button
          backgroundColor: '#7500D1',
          color: 'white',
          border: 'none',
          cursor: 'pointer',    
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional shadow for better visibility
          zIndex: 1000,
        }}
      >
        < FaAngleDoubleUp  size={20} /> {/* Use the up arrow icon */}
      </button>
    )
  );
};

export default ScrollToTopButton;
