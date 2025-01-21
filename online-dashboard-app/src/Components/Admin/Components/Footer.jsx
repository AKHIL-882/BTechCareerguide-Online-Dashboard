import React from "react";

const Footer = () => {
  return (
    <div className="text-center py-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 border-t border-gray-300 text-sm text-gray-700 mt-auto shadow-inner md:pl-52">
  <p className="font-medium">
    &copy; {new Date().getFullYear()} All rights reserved - ProjPort
  </p>
</div>

  );
};

export default Footer;
