import React from "react";
import { FaYoutube,FaRocket } from "react-icons/fa";

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
        <p className="text-gray-200 text-sm lg:text-base font-sans">
          Step into a world of opportunities where learning meets growth.
          Discover resources tailored to help you build skills and achieve your
          career dreams.
        </p>
        <div className="flex justify-center md:justify-start items-center">
        <button
          onClick={() => handleGetStartedClick(true)}
          className=" text-gray-700 bg-gradient-to-tr from-slate-100 p-2 px-6 border-2 border-gray-300 hover:border-slate-50 font-sans rounded-md flex justify-center items-center"
        >
         <FaRocket size={15} className="mr-1"/> Get Started
        </button>
        <a
          href="https://www.youtube.com/@btechcareerguide"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className=" text-slate-50 p-2 px-6 border-2 ml-2 border-gray-300 hover:border-slate-50 hover:text-slate-50 font-sans rounded-md bg-gradient-to-tr from-red-500 flex justify-center items-center">
          <FaYoutube size={20} className="mr-1"/> YouTube
          </button>
        </a>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
