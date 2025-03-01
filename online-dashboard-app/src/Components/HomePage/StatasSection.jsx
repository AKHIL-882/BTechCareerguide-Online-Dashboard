import React, { useEffect, useState } from "react";

// Helper component for showing the count with animation
const CountUp = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = end / duration;

    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(interval);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 10); // This will update 60 times per second (for smooth animation)

    return () => clearInterval(interval); // Cleanup on unmount
  }, [end, duration]);

  return <span>{count}</span>;
};

const StatsSection = () => {
  return (
    <div className="py-20 px-4 bg-gradient-to-b from-violet-800 to-purple-500 text-white text-center">
      <div className="flex flex-wrap justify-around gap-8 md:gap-16">
        <div className="w-full md:w-auto text-3xl font-semibold">
          <h3 className="text-slate-200 font-display">Jobs</h3>
          <div className="text-3xl font-sans">
            <CountUp end={3200} duration={5} />
          </div>
        </div>
        <div className="w-full md:w-auto text-3xl font-semibold">
          <h3 className="text-slate-200 font-display">Projects</h3>
          <div className="text-3xl font-sans">
            <CountUp end={450} duration={5} />
          </div>
        </div>
        <div className="w-full md:w-auto text-3xl font-semibold">
          <h3 className="text-slate-200 font-display">Developers</h3>
          <div className="text-3xl font-sans">
            <CountUp end={220} duration={5} />
          </div>
        </div>
        <div className="w-full md:w-auto text-3xl font-semibold">
          <h3 className="text-slate-200 font-display">Students</h3>
          <div className="text-3xl font-sans">
            <CountUp end={12000} duration={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
