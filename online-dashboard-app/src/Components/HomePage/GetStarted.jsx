import React from "react";

const GetStarted = ({ handleGetStartedClick }) => {
  return (
    <div className="w-full lg:w-6/12 h-full flex flex-col items-center text-center lg:text-left pb-4 md:pb-0 justify-center">
      <div className="space-y-3 mt-16 lg:mt-10">
        {" "}
        {/* Added margin-top for small screens */}
        <h1 className="text-4xl lg:text-5xl text-slate-50 font-sans">
          Unlock Your Career Potential
        </h1>
        <h1 className="text-2xl lg:text-3xl text-slate-50 font-sans">
          Jobs, Projects, and Company Coding Q&A Await!
        </h1>
        <p className="text-gray-50 text-sm lg:text-base font-sans">
          Step into a world of opportunities where learning meets growth.
          Discover resources tailored to help you build skills and achieve your
          career dreams.
        </p>
        <button
          onClick={() => handleGetStartedClick(true)}
          className=" text-violet-900 p-2 px-6 border-2 border-gray-300 hover:border-slate-50 hover:text-slate-50 font-sans"
        >
          Get Started
        </button>
        <a
          href="https://www.youtube.com/@btechcareerguide"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className=" text-slate-50 p-2 px-6 border-2 ml-2 border-gray-300 hover:border-slate-50 hover:text-slate-50 font-sans">
            YouTube
          </button>
        </a>
      </div>
    </div>
  );
};

export default GetStarted;
