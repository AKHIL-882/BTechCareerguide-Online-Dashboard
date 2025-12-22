import React from "react";
import { FaYoutube, FaRocket } from "react-icons/fa";
import FadeInStagger from "./FadeInStagger";

const GetStarted = ({ handleGetStartedClick }) => {
  return (
    <div className="w-full lg:w-8/12 h-full flex flex-col items-center text-center lg:text-left pb-4 md:pb-0 justify-center">
      <div className="space-y-3 mt-16 lg:mt-10">
        {" "}
        {/* Added margin-top for small screens */}
        <FadeInStagger
          direction="bottom"
          delay={0.1}
          duration={0.8}
          once={false}
        >
          <h1 className="text-3xl lg:text-4xl text-gray-800 font-sans pb-2">
            Unlock Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-green-500">
              Career Potential
            </span>{" "}
            with Jobs, Projects, and Company Coding Q&A
          </h1>
          {/* <h1 className="text-2xl lg:text-3xl text-gray-700 font-sans">
          
        </h1> */}
          <p className="text-gray-700 text-sm lg:text-base font-sans pb-2">
            Step into a world of opportunities where learning meets growth.
            Discover resources tailored to help you build skills and achieve
            your career dreams.
          </p>
          <div className="flex justify-center md:justify-start items-center">
            <button
              onClick={() => handleGetStartedClick(true)}
              className=" text-white bg-violet-500 p-2 px-6 border-2 hover:border-gray-300 font-sans rounded-md flex justify-center items-center"
            >
              <FaRocket size={15} className="mr-1" /> Get Started
            </button>
            <a
              href="https://www.youtube.com/@btechcareerguide"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className=" text-gray-500 p-2 px-6 border-2 ml-2 border-gray-400 hover:border-gray-500 hover:text-gray-900 font-sans rounded-md flex justify-center items-center">
                <FaYoutube size={20} className="mr-1" /> YouTube
              </button>
            </a>
          </div>
        </FadeInStagger>
      </div>
    </div>
  );
};

export default GetStarted;
