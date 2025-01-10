import React from "react";
import { FaBriefcase, FaProjectDiagram, FaBuilding, FaCode } from "react-icons/fa";

const OfferingCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl border bottom-1">
    <div className="mb-4 p-4 bg-blue-500 text-white rounded-full inline-block">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const OfferingSection = () => {
  return (
    <div className="py-16 px-4 bg-gray-50 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-10">What We Are Offering</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <OfferingCard
          icon={<FaBriefcase size={30} />}
          title="Jobs"
          description="Explore exciting job opportunities with leading companies."
        />
        <OfferingCard
          icon={<FaProjectDiagram size={30} />}
          title="Projects"
          description="Request a project and get it at a reasonable cost."
        />
        <OfferingCard
          icon={<FaCode size={30} />}
          title="Coding QA"
          description="Get company coding solutions at a reasonable cost."
        />
      </div>
    </div>
  );
};

export default OfferingSection;
