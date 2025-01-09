import React from "react";
import { FaTelegram, FaWhatsapp, FaYoutube, FaInstagram } from "react-icons/fa";

const Community = () => {
  // Example data for followers or members count
  const communityData = {
    telegram: 1200,
    whatsapp: 800,
    youtube: 5000,
    instagram: 3500,
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center sm:text-4xl lg:text-5xl">
        Join Our Community
      </h2>
      <p className="text-lg text-gray-600 mb-12 text-center sm:text-xl lg:text-2xl">
        Connect with us on our social platforms:
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {/* Telegram Link */}
        <a
          href="https://t.me/yourcommunity" // Replace with your Telegram link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 p-4 rounded-full shadow-lg hover:scale-110 transform transition duration-300 flex items-center space-x-2"
        >
          <FaTelegram size={30} className="text-white" />
          <span className="text-white text-xl">{communityData.telegram}</span>
        </a>

        {/* WhatsApp Link */}
        <a
          href="https://wa.me/yourphone" // Replace with your WhatsApp link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 p-4 rounded-full shadow-lg hover:scale-110 transform transition duration-300 flex items-center space-x-2"
        >
          <FaWhatsapp size={30} className="text-white" />
          <span className="text-white text-xl">{communityData.whatsapp}</span>
        </a>

        {/* YouTube Link */}
        <a
          href="https://youtube.com/yourchannel" // Replace with your YouTube link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 p-4 rounded-full shadow-lg hover:scale-110 transform transition duration-300 flex items-center space-x-2"
        >
          <FaYoutube size={30} className="text-white" />
          <span className="text-white text-xl">{communityData.youtube}</span>
        </a>

        {/* Instagram Link */}
        <a
          href="https://instagram.com/yourprofile" // Replace with your Instagram link
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-500 p-4 rounded-full shadow-lg hover:scale-110 transform transition duration-300 flex items-center space-x-2"
        >
          <FaInstagram size={30} className="text-white" />
          <span className="text-white text-xl">{communityData.instagram}</span>
        </a>
      </div>
    </div>
  );
};

export default Community;
