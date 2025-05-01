import React from "react";
import {
  FaCheckCircle,
  FaClipboardList,
  FaCode,
  FaProjectDiagram,
} from "react-icons/fa";
import CountUpOnScroll from "../HomePage/CountUponScroll";

const cards = [
  {
    icon: <FaCheckCircle className="text-white text-xl" />,
    label: "Applied",
    count: 12,
    bg: "bg-green-400",
  },
  {
    icon: <FaProjectDiagram className="text-white text-xl" />,
    label: "Projects",
    count: 7,
    bg: "bg-blue-400",
  },
  {
    icon: <FaClipboardList className="text-white text-xl" />, // 🧪 Vial icon for "Tests"
    label: "Tests",
    count: 5,
    bg: "bg-pink-400",
  },
  {
    icon: <FaCode className="text-white text-xl" />,
    label: "QA",
    count: 24,
    bg: "bg-yellow-400",
  },
];

const StatsOverlayCards = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 absolute w-full -mt-12 px-4 z-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-4 rounded-lg shadow-md text-white ${card.bg} hover:transition-transform hover:duration-500 hover:-translate-y-2`}
        >
          <div className="w-12 h-12 flex items-center justify-center border border-white rounded-full">
            {card.icon}
          </div>
          <div className="text-right ml-4">
            <p className="text-sm">{card.label}</p>
            <p className="text-xl font-bold">
              <CountUpOnScroll end={card.count} duration={5} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverlayCards;
