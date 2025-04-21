import React, { useEffect, useRef, useState } from "react";
import {
  FaBriefcase,
  FaProjectDiagram,
  FaUserTie,
  FaUserGraduate,
} from "react-icons/fa"; // Importing icons
import FadeInStagger from "./FadeInStagger";

// 🔢 CountUpOnScroll component (all-in-one)
const CountUpOnScroll = ({ end, duration = 2 }) => {
  const ref = useRef();
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [end, duration, hasAnimated]);

  const animateCount = () => {
    let start = 0;
    const step = end / (duration * 10); // 10 steps per second

    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(interval);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 100);
  };

  return <span ref={ref}>{count}</span>;
};

// 🧮 StatsSection using CountUpOnScroll
const StatsSection = () => {
  return (
    <div className="py-14 px-4 bg-gradient-to-b from-violet-500 to-green-500 text-white text-center">
      <FadeInStagger direction="bottom" delay={0.1} duration={0.8} once={false}>
        <div className="flex flex-wrap justify-around gap-8 md:gap-16">
          {/* Stats Item 1: Jobs */}
          <div className="w-full md:w-auto text-3xl font-semibold">
            <div className="text-3xl font-sans mb-4">
              <CountUpOnScroll end={3200} duration={5} /> {"+"}
            </div>
            <h3 className="text-slate-200 font-display flex items-center justify-center gap-2">
              <FaBriefcase /> Jobs
            </h3>
          </div>

          {/* Stats Item 2: Projects */}
          <div className="w-full md:w-auto text-3xl font-semibold">
            <div className="text-3xl font-sans mb-4">
              <CountUpOnScroll end={450} duration={5} /> {"+"}
            </div>
            <h3 className="text-slate-200 font-display flex items-center justify-center gap-2">
              <FaProjectDiagram /> Projects
            </h3>
          </div>

          {/* Stats Item 3: Developers */}
          <div className="w-full md:w-auto text-3xl font-semibold">
            <div className="text-3xl font-sans mb-4">
              <CountUpOnScroll end={220} duration={5} /> {"+"}
            </div>
            <h3 className="text-slate-200 font-display flex items-center justify-center gap-2">
              <FaUserTie /> Developers
            </h3>
          </div>

          {/* Stats Item 4: Students */}
          <div className="w-full md:w-auto text-3xl font-semibold">
            <div className="text-3xl font-sans mb-4">
              <CountUpOnScroll end={12000} duration={5} /> {"+"}
            </div>
            <h3 className="text-slate-200 font-display flex items-center justify-center gap-2">
              <FaUserGraduate /> Students
            </h3>
          </div>
        </div>
      </FadeInStagger>
    </div>
  );
};

export default StatsSection;
