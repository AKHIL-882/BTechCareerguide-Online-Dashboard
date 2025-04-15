// import React, { useState, useEffect } from "react";

// const Header = ({ isLogin, setIsLogin }) => {
//   const [isTransparent, setIsTransparent] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsTransparent(false);
//       } else {
//         setIsTransparent(true);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <header
//       className={`flex justify-between items-center px-6 md:py-4 py-3 ${
//         isTransparent ? "bg-white border border-b-gray-200 shadow-sm" : "bg-white border border-b-gray-200 shadow-md"
//       } w-full z-50 fixed transition-colors duration-300`}
//     >
//       <div className="text-2xl font-bold">
//         <h1 className="text-violet-500">PROJPORT</h1>
//       </div>
//       <a
//         href="#login"
//         onClick={() => {
//           setIsLogin(!isLogin); // Toggle to login form
//           window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
//         }}
//         className="text-slate-50 bg-violet-500 hover:text-white transition border-[2px] px-3 py-1 rounded-lg border-gray-300 hover:border-gray-50 font-display"
//       >
//         {!isLogin ? "Login" : "Create Account"}
//       </a>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = ({ isLogin, setIsLogin }) => {
  const [isTransparent, setIsTransparent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsTransparent(false);
      } else {
        setIsTransparent(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Trending Jobs", href: "#trending" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "FAQs", href: "#faqs" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isTransparent
          ? "bg-white border border-b-gray-200 shadow-sm"
          : "bg-white border border-b-gray-200 shadow-md"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:py-4 py-3">
        <h1 className="text-2xl font-bold text-violet-500">PROJPORT</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-sans items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-violet-600 transition"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#login"
            onClick={() => {
              setIsLogin(!isLogin);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-slate-50 bg-violet-500 hover:bg-violet-600 transition border-[2px] px-3 py-1 rounded-lg font-display"
          >
            {!isLogin ? "Login" : "Create Account"}
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-violet-600 border border-gray-200 p-2 rounded"
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4 border-t border-gray-200">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-violet-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#login"
            onClick={() => {
              setIsLogin(!isLogin);
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMenuOpen(false);
            }}
            className="text-center bg-violet-500 text-white py-2 rounded-lg font-display"
          >
            {!isLogin ? "Login" : "Create Account"}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

