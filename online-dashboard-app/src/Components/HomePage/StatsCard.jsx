import React from "react";
import CountUpOnScroll from "./CountUpOnScroll";

const StatsCard = ({ icon: Icon, label, count, duration = 5 }) => {
  return (
    <div className="w-full md:w-auto text-3xl font-semibold">
      <div className="text-3xl font-sans mb-4"> 
        {count ? <CountUpOnScroll end={Number(count)} duration={duration} /> : 0} {"+"}
      </div>
      <h3 className="text-slate-200 font-display flex items-center justify-center gap-2">
        <Icon /> {label}
      </h3>
    </div>
  );
};

export default StatsCard;
