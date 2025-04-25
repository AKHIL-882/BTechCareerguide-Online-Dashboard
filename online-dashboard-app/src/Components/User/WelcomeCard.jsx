import React from "react";

const WelcomeCard = ({ name, message, imageUrl }) => {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-gradient-to-r from-violet-500 to-violet-400 text-white rounded-lg shadow-lg p-2 pb-14 flex justify-between items-center w-full mx-auto mb-2">
      {/* Left Content */}
      <div>
        <p className="text-sm mb-2">{today}</p>
        <h2 className="text-3xl font-semibold font-sans">Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-tr from-green-300 to-blue-200">{name}</span>👋</h2>
        <p className="font-sans">{message}</p>
      </div>
      {/* Right Image */}
      <div className="w-24 h-24 ml-6">
        <img
          src={imageUrl}
          alt="Welcome"
          className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
        />
      </div>
    </div>
  );
};

export default WelcomeCard;
