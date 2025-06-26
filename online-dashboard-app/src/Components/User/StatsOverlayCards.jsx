import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClipboardList,
  FaCode,
  FaProjectDiagram,
} from "react-icons/fa";
import CountUpOnScroll from "../HomePage/CountUpOnScroll";
import { getUserDetails } from "../../Api";

const iconMap = {
  Viewed: <FaCheckCircle className="text-white text-xl" />,
  Projects: <FaProjectDiagram className="text-white text-xl" />,
  Tests: <FaClipboardList className="text-white text-xl" />,
  QA: <FaCode className="text-white text-xl" />,
};

const bgMap = {
  Viewed: "bg-green-400",
  Projects: "bg-blue-400",
  Tests: "bg-pink-400",
  QA: "bg-yellow-400",
};

const StatsOverlayCards = () => {
  const [stats, setStats] = useState([]);

  const localData = localStorage.getItem("data");
  const accessToken = JSON.parse(localData)?.access_token;

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await getUserDetails(accessToken);
        if (response?.header_stats) {
          setStats(response.header_stats);
        }
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 absolute w-full -mt-12 px-4 z-10">
      {stats.map((card, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-4 rounded-lg shadow-md text-white ${bgMap[card.label] || "bg-gray-400"} hover:transition-transform hover:duration-500 hover:-translate-y-2`}
        >
          <div className="w-12 h-12 flex items-center justify-center border border-white rounded-full">
            {iconMap[card.label] || (
              <FaCheckCircle className="text-white text-xl" />
            )}
          </div>
          <div className="text-right ml-4">
            <p className="text-sm">{card.label}</p>
            <p className="text-xl font-bold">
              <CountUpOnScroll end={card.value} duration={5} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverlayCards;
