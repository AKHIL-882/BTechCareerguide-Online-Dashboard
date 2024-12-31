import React from "react";

const Footer = () => {
  return (
    <div className="text-center py-4 bg-gray-100 border-t border-gray-300 text-sm text-gray-600 mt-auto md:pl-52">
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </div>
  );
};

export default Footer;