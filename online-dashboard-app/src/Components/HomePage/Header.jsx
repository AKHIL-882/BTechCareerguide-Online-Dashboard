import React, { useState, useEffect } from "react";

const Header = ({ isLogin, setIsLogin }) => {
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsTransparent(false);
      } else {
        setIsTransparent(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`flex justify-between items-center px-6 md:py-4 py-3 ${
        isTransparent ? "bg-transparent" : "bg-violet-800"
      } w-full z-50 fixed transition-colors duration-300`}
    >
      <div className="text-2xl font-bold">
        <h1 className="text-white font-display">ProjPort</h1>
      </div>
      <a
        href="#login"
        onClick={() => {
          setIsLogin(!isLogin); // Toggle to login form
          window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
        }}
        className="text-slate-50 hover:text-white transition border-[2px] px-3 py-1 rounded-md border-gray-300 hover:border-gray-50 font-display"
      >
        {!isLogin ? "Login" : "Create Account"}
      </a>
    </header>
  );
};

export default Header;