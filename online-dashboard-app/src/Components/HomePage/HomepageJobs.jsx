import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa"; // location and salary icons from FontAwesome
import CompanyMarquee from "./ComapanyMarquee";
import FadeInStagger from "./FadeInStagger";
import PopupNotification from "./PopupNotification";
import JobsTable from "../User/JobsTable";

const HomepageJobs = ({jobshome,companies}) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="w-full px-4 py-8 bg-slate-50 overflow-x-hidden">
      <FadeInStagger direction="right" delay={0.1} duration={0.8} once={false}>
        <div className="text-center mb-4">
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
        {Array.isArray(jobshome) && jobshome.length > 0 && <JobsTable jobs={jobshome?.slice(0, 3)} isJobshome={true} />}
      </FadeInStagger>
      <CompanyMarquee companies={companies}/>
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
