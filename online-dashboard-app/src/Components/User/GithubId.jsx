import React, { useState } from "react";
import { FaGithub, FaInfoCircle, FaTimes, FaCheckCircle } from "react-icons/fa";

const GithubId = ({ onClose, onSubmit }) => {
  const [githubId, setGithubId] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative bg-white w-full max-w-[586px] min-h-[250px] shadow-xl rounded-md px-6 py-8 sm:px-8 sm:py-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black rounded-sm p-1 hover:scale-105 hover:bg-red-500"
        >
          <FaTimes />
        </button>

        {/* Header Icons */}
        <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
            C
          </div>
          <span className="text-green-500">{"---"}</span>
          <FaCheckCircle className="text-green-500 text-3xl"/>
          <span className="text-green-500">{"---"}</span>
          <FaGithub className="text-black bg-white rounded-full" size={40} />
        </div>

        {/* Input + Info + Submit */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Enter GitHub ID"
              className="border border-gray-300 rounded px-10 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
              value={githubId}
              onChange={(e) => setGithubId(e.target.value)}
            />

            {/* Clear Icon */}
            {githubId && (
              <button
                onClick={() => setGithubId("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                <FaTimes />
              </button>
            )}

            {/* Info Icon with Tooltip */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 group">
              <FaInfoCircle className="text-black text-base cursor-pointer" />
              {/* Tooltip */}
              <div
                className="absolute z-50 hidden group-hover:block 
    sm:top-2 sm:-translate-y-1/2 sm:-translate-x-full sm:-left-3
    top-1/2 left-full -translate-y-1/2 ml-2 w-80"
              >
                <div className="relative bg-black text-white text-sm px-4 py-3 rounded shadow-lg">
                  <p className="mb-1">
                    Enter your GitHub username (not full URL)
                  </p>
                  <div className="border-t border-gray-400 my-2"></div>
                  <p>
                    Your GitHub ID will help us whenever you buy a project from
                    us. It makes things easier for both of us.
                  </p>

                  {/* Left arrow for desktop */}
                  <div className="hidden sm:block absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-black"></div>

                  {/* Right arrow for mobile */}
                  <div className="block sm:hidden absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-black"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => onSubmit(githubId)}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full sm:w-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GithubId;
