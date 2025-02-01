import React from "react";
const CopyRightFooter = ({ className, text }) => {
  return (
    <footer className="text-center py-4 bg-violet-700 text-sm text-white mt-auto">
      &copy; {new Date().getFullYear()} All rights reserved - ProjPort
    </footer>
  );
};

export default CopyRightFooter;
