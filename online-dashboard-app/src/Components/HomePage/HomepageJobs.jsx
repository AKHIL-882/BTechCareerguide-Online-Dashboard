import React, { useState } from "react";
import { FaMapMarkerAlt, FaDollarSign, FaArrowRight } from "react-icons/fa"; // location and salary icons from FontAwesome
import CompanyMarquee from "./ComapanyMarquee";
import FadeInStagger from "./FadeInStagger";
import PopupNotification from "./PopupNotification";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechSpark",
    type: "Full-time",
    salary: "$50,000 - $70,000",
    location: "Remote",
    posted: "2 days ago",
    image:
      "https://static.vecteezy.com/system/resources/previews/020/336/451/non_2x/infosys-logo-infosys-icon-free-free-vector.jpg",
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    company: "CodeWave",
    type: "Internship",
    salary: "Stipend ₹15,000",
    location: "Bangalore",
    posted: "5 days ago",
    image:
      "https://static.vecteezy.com/system/resources/previews/020/336/451/non_2x/infosys-logo-infosys-icon-free-free-vector.jpg",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignHub",
    type: "Full-time",
    salary: "$40,000 - $60,000",
    location: "New York",
    posted: "1 week ago",
    image:
      "https://static.vecteezy.com/system/resources/previews/020/336/451/non_2x/infosys-logo-infosys-icon-free-free-vector.jpg",
  },
];

const HomepageJobs = () => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="w-full px-4 py-8 bg-slate-50 overflow-x-hidden">
      <FadeInStagger direction="right" delay={0.1} duration={0.8} once={false}>
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl text-gray-800 font-sans pb-2">
            Explore{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-green-500">
              Top Trending Jobs
            </span>{" "}
            that match your passion.
          </h1>
          <p className="text-gray-500 mt-1">1000+ jobs to explore</p>
        </div>
      </FadeInStagger>
      <FadeInStagger direction="bottom" delay={0.1} duration={0.8} once={false}>
        <div className="flex flex-wrap justify-center gap-5 mb-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="w-full sm:w-[400px] border border-gray-200 rounded-lg p-4 py-8 shadow-sm flex flex-col justify-between bg-white"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={job.image}
                  alt={job.title}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-sans">{job.title}</h3>
                  <p className="text-violet-600 text-sm font-sans">
                    {job.company}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 md:px-3 py-1 text-xs bg-green-100 text-green-500 rounded-full font-sans">
                  {job.type}
                </span>

                <span className="px-2 md:px-3 py-1 text-xs bg-orange-100 text-orange-600 rounded-full flex items-center gap-1">
                  <FaDollarSign size={12} /> {job.salary}
                </span>

                <span className="px-2 md:px-3 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-full flex items-center gap-1">
                  <FaMapMarkerAlt size={12} /> {job.location}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm mt-4 text-gray-500">
                <span>{job.posted}</span>
                <a
                  href="#"
                  className="text-violet-600 font-medium hover:underline"
                >
                  Apply
                </a>
              </div>
            </div>
          ))}
        </div>
      </FadeInStagger>
      <CompanyMarquee />
      <div className="text-center flex justify-center mt-8">
        <button
          onClick={() => setShowPopup(true)}
          className="text-violet-600 border border-violet-600 px-5 py-2 rounded-full hover:bg-violet-50 transition font-medium flex justify-center items-center"
        >
          <span>View All Jobs</span>
          <FaArrowRight className="ml-2" />
        </button>
      </div>
      {showPopup && (
        <PopupNotification
          onClose={() => setShowPopup(false)}
          title="Login to access all the jobs"
        />
      )}
    </div>
  );
};

export default HomepageJobs;
