import React from "react";
import CountUpOnScroll from "./CountUpOnScroll";

const SocialCard = ({
  icon: Icon,
  label,
  url,
  count,
  suffix,
  bgColor,
  textColor,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className={`p-4 rounded-full ${bgColor}`}>
          <Icon className={`text-2xl ${textColor}`} />
        </div>
      </a>
      <div>
        <p className="text-lg font-semibold font-display">{label}</p>
        <p className="text-sm text-gray-500 font-sans whitespace-nowrap">
          {count ? <CountUpOnScroll end={Number(count)} duration={3} /> : 0} +{" "}
          {suffix}
        </p>
      </div>
    </div>
  );
};

export default SocialCard;
