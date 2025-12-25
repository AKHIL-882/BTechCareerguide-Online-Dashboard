import React from "react";
import {
  FaBriefcase,
  FaProjectDiagram,
  FaUserTie,
  FaUserGraduate,
} from "react-icons/fa";
import FadeInStagger from "./FadeInStagger";
import StatsCard from "./StatsCard";

const StatsSection = ({ stats }) => {
  return (
    <div className="py-14 px-4 bg-gradient-to-b from-violet-500 to-green-500 text-white text-center">
      <FadeInStagger direction="bottom" delay={0.1} duration={0.8} once={false}>
        <div className="flex flex-wrap justify-around gap-8 md:gap-16">
          {/* Using StatsCard component for each stat */}
          <StatsCard icon={FaBriefcase} label="Jobs" count={stats?.jobs} />
          <StatsCard
            icon={FaProjectDiagram}
            label="Projects"
            count={stats?.projects}
          />
          <StatsCard
            icon={FaUserTie}
            label="Developers"
            count={stats?.developers}
          />
          <StatsCard
            icon={FaUserGraduate}
            label="Students"
            count={stats?.students}
          />
        </div>
      </FadeInStagger>
    </div>
  );
};

export default StatsSection;
