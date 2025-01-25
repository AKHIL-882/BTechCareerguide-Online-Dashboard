import React, { useEffect, useState } from "react";
import Spinner from "../Admin/Components/Spinner";
import SearchProjects from "./SearchProjects";
import {
  FaYoutube,
  FaCode,
  FaTrophy,
  FaAngleDoubleRight,
} from "react-icons/fa";

const Projects = ({ isDashBoard }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch projects from the API
    const fetchProjects = async () => {
      try {
        const data = JSON.parse(localStorage.getItem("data"));
        const accessToken = data ? data.access_token : null;

        const response = await fetch(
          "http://127.0.0.1:8000/api/admin-projects",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        isDashBoard
          ? setProjects(responseData.data.slice(0, 3))
          : setProjects(responseData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <p className="flex items-center justify-center p-5">
        <Spinner loading={loading} color={"#0000FF"} size={20} />
        <span className="pl-1">Projects...</span>
      </p>
    );
  }

  if (error) {
    return <p>Error fetching projects: {error}</p>;
  }
  const transformToEmbedURL = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const flattenedProjects = projects.flat();

  return (
    <section>
      {!isDashBoard && (
        <div className="flex justify-between items-center">
          {/* Header Section */}
          <h2 className="text-xl font-bold text-blue-950 mb-2 relative flex items-center space-x-2 p-2">
            <div className="flex items-center space-x-2">
              <FaTrophy className="text-violet-600 w-5 h-5 mb-1.5" />
              <span className="mb-1">Projects</span>
            </div>
            <FaAngleDoubleRight className="text-violet-600 w-5 h-5" />
          </h2>
          <SearchProjects setProjects={setProjects} />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.isArray(flattenedProjects) &&
          flattenedProjects.map((project, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-1">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-lg text-blue-950">
                  {project.company_name}
                </h4>
                <div className="flex justify-between items-center space-x-2">
                  <a
                    href={project.youtube_video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-red-500 p-1 rounded-full hover:bg-red-500 flex justify-center items-center group transition-all duration-500 ease-in-out"
                  >
                    <span className="overflow-hidden whitespace-nowrap text-white font-semibold transition-all duration-500 ease-in-out group-hover:ml-2 group-hover:w-auto w-0 group-hover:mr-2">
                      Youtube
                    </span>
                    <div className="w-8 h-8 rounded-full flex justify-center items-center bg-red-500 group-hover:border-2 border-white">
                      <FaYoutube size={16} />
                    </div>
                  </a>
                  <a
                    href={project.payment_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-violet-500 p-1 rounded-full hover:bg-violet-700 flex justify-center items-center group transition-all duration-500 ease-in-out"
                  >
                    <span className="overflow-hidden whitespace-nowrap text-white font-semibold transition-all duration-500 ease-in-out group-hover:ml-2 group-hover:w-auto w-0 group-hover:mr-2">
                      GetCode
                    </span>
                    <div className="w-8 h-8 rounded-full flex justify-center items-center bg-violet-500 group-hover:border-2 border-white">
                      <FaCode size={16} />
                    </div>
                  </a>
                </div>
              </div>
              {isDashBoard && (
                <iframe
                  className="mt-2 rounded-lg"
                  width="100%"
                  height="150px"
                  src={transformToEmbedURL(project.youtube_video_link)}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ))}
      </div>
    </section>
  );
};

export default Projects;
