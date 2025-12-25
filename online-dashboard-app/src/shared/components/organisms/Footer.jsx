import React from "react";

const Footer = () => {
  return (
    <div className="footer border-t-2 bottom-0 w-full text-center py-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border-gray-300 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 mt-auto shadow-inner md:pl-52">
      <p className="font-medium">
        &copy; {new Date().getFullYear()} All rights reserved - ProjPort
      </p>
    </div>
  );
};

export default Footer;
