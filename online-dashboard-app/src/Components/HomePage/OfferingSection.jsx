import React from "react";
import {
  FaBriefcase,
  FaProjectDiagram,
  FaCode,
  FaChalkboardTeacher,
  FaLightbulb,
  FaPlayCircle
} from "react-icons/fa";

const OfferingCard = ({ icon, title, description }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group flex items-center space-x-4">
    {/* Icon section */}
    <div className="p-6 bg-violet-800 text-white rounded-sm inline-block transition-colors duration-300 group-hover:bg-violet-600">
      {icon}
    </div>
    {/* Text section */}
    <div className="text-left">
      <h3 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-violet-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
        {description}
      </p>
    </div>
  </div>
);

const OfferingSection = () => {
  // Array of services data
  const offerings = [
    {
      icon: <FaBriefcase size={30} />,
      title: "Jobs",
      description: "Explore exciting job opportunities with leading companies."
    },
    {
      icon: <FaProjectDiagram size={30} />,
      title: "Projects",
      description: "Request a project and get it at a reasonable cost."
    },
    {
      icon: <FaCode size={30} />,
      title: "Coding QA",
      description: "Get company coding solutions at a reasonable cost."
    },
    {
      icon: <FaChalkboardTeacher size={30} />,
      title: "Career Guidance",
      description: "Receive expert advice to shape your career and achieve your goals."
    },
    {
      icon: <FaLightbulb size={30} />,
      title: "Upskilling Sessions",
      description: "Participate in interactive sessions to enhance your skills."
    },
    {
      icon: <FaPlayCircle size={30} />,
      title: "Course Materials",
      description: "Access comprehensive course videos and materials anytime."
    }
  ];

  return (
    <div className="pt-14 pb-28 px-4 bg-violet-50 text-center">
      <h2 className="text-3xl font-bold text-blue-950 mb-2 relative p-2">
        Services
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-16 h-1 bg-violet-600"></span>
      </h2>
      {/* Added paragraph */}
      <p className="text-gray-600 text-lg mb-10">
        Explore our range of services designed to help you with jobs, projects,
        and coding solutions.
      </p>
      <div className="flex flex-wrap justify-around gap-6 md:gap-y-12">
        {/* Map through the offerings and create the OfferingCard for each */}
        {offerings.map((offering, index) => (
          <OfferingCard
            key={index}
            icon={offering.icon}
            title={offering.title}
            description={offering.description}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferingSection;
