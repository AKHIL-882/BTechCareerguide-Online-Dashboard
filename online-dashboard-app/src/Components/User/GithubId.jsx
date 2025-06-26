// src/Components/User/GithubId.jsx
import React, { useState } from "react";
import {
  FaGithub,
  FaInfoCircle,
  FaTimes,
  FaCheckCircle,
  FaQuestionCircle,
} from "react-icons/fa";
import { submitGithubId } from "../../Api";

const GithubId = ({ onClose, userId }) => {
  const [githubId, setGithubId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    if (!githubId.trim()) {
      setIsError(true);
      return;
    }

    try {
      await submitGithubId(userId, githubId.trim());
      setSubmitted(true);
      setIsError(false);
    } catch (err) {
      localStorage.clear();
      alert("Session Expired! Relogin Again!!")
      console.error("GitHub ID submission failed:", err);
      setIsError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative bg-white w-full max-w-[586px] min-h-[250px] shadow-xl rounded-md px-6 py-8 sm:px-8 sm:py-10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black rounded-sm p-1 hover:scale-105 hover:bg-red-500"
        >
          <FaTimes />
        </button>

        <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-bold">
            C
          </div>
          <span className="text-green-500">{"---"}</span>
          {submitted ? (
            <FaCheckCircle className="text-green-500 text-3xl" />
          ) : (
            <FaQuestionCircle className="text-red-600 text-3xl" />
          )}
          <span className="text-green-500">{"---"}</span>
          <FaGithub className="text-black bg-white rounded-full" size={40} />
        </div>

        {!submitted ? (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Enter GitHub ID"
                className="border border-gray-300 rounded px-10 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black"
                value={githubId}
                onChange={(e) => setGithubId(e.target.value)}
              />
              {githubId && (
                <button
                  onClick={() => setGithubId("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  <FaTimes />
                </button>
              )}

              <div className="absolute left-2 top-1/2 -translate-y-1/2 group">
                <FaInfoCircle className="text-black text-base cursor-pointer" />
                <div className="absolute z-50 hidden group-hover:block top-1/2 left-full -translate-y-1/2 ml-2 w-80">
                  <div className="relative bg-black text-white text-sm px-4 py-3 rounded shadow-lg">
                    <p className="mb-1">
                      Enter your GitHub username (not full URL)
                    </p>
                    <div className="border-t border-gray-400 my-2" />
                    <p>
                      Your GitHub ID helps us associate you with purchases and
                      projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full sm:w-auto"
            >
              Submit
            </button>
          </div>
        ) : (
          <p className="text-center text-green-500">
            GitHub account submitted successfully. Thank you!
          </p>
        )}

        {isError && (
          <p className="text-red-500 text-left ml-14 mt-2">
            Please enter a valid GitHub username
          </p>
        )}
      </div>
    </div>
  );
};

export default GithubId;
