import React, { useEffect, useState } from "react";
import ShimmerProjects from "./ShimmerProjects";
import SearchProjects from "./SearchProjects";
import { FaYoutube, FaCode, FaSearch, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SectionHeading from "./SectionHeading";

const Projects = ({ isDashBoard }) => {
  const [projects, setProjects] = useState([]);
  const [noSearchedProjects, setNoSearchedProjects] = useState([]);
  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
          }
        );
        if (!response.ok) {
          localStorage.clear();
          navigate("/");
        }
        const responseData = await response.json();
        isDashBoard
          ? setProjects(responseData.data.slice(0, 3))
          : (setProjects(responseData.data),
            setNoSearchedProjects(responseData.data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <p>Error fetching projects: {error}</p>;
  }
  const transformToEmbedURL = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const flattenedProjects = projects.flat();
  const noSearchedProjectsfn = () => {
    setIsEmptySearch(true);
    setProjects(noSearchedProjects);
  };

  return (
    <section>
      {!isDashBoard && (
        <div className="flex justify-between items-baseline">
          {/* Header Section */}
          <SectionHeading text="projects" />
          <SearchProjects
            setProjects={setProjects}
            noSearchedProjectsfn={noSearchedProjectsfn}
          />
        </div>
      )}
      {loading ? (
        <ShimmerProjects isDashBoard={isDashBoard} count={3} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isEmptySearch && flattenedProjects.length === 0 ? (
            <div className="flex items-center justify-center col-span-full h-auto">
              <div className="flex flex-col items-center justify-center p-4 space-y-4 bg-gray-50 rounded-lg shadow-md">
                <h1 className="text-lg Font-sans text-gray-700 flex justify-center items-center">
                  <FaSearch className="text-gray-400 text-2xl mr-2" />{" "}
                  <span>No Projects Found</span>
                </h1>
                <p className="text-sm text-gray-500 font-sans">
                  We couldn't find any projects. Try searching for something
                  else.
                </p>
              </div>
            </div>
          ) : (
            Array.isArray(flattenedProjects) &&
            flattenedProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden p-1 relative"
              >
                {isDashBoard ? (
                  <>
                    {/* Thumbnail */}
                    <div className="w-full h-48 rounded-t-lg relative">
                      <img
                        src={`https://img.youtube.com/vi/${project.youtube_video_link.split("v=")[1]?.split("&")[0] || project.youtube_video_link.split("/").pop()}/hqdefault.jpg`}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover"
                      />

                      {/* Play Button at Bottom-Center of Thumbnail */}
                      <a
                        href={project.youtube_video_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-[-24px] right-0 transform -translate-x-1/2 z-10"
                      >
                        <div className="group relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-tr from-white to-gray-100 shadow-lg hover:shadow-[0_0_25px_10px_rgba(255,0,102,0.5)] hover:from-pink-100 hover:to-purple-200 transition-all duration-500 ease-in-out">
                          <div className="absolute w-full h-full rounded-full bg-pink-400 opacity-20 blur-xl scale-0 group-hover:scale-100 transition-transform duration-700 ease-out"></div>
                          <FaPlay className="relative text-violet-600 text-2xl group-hover:text-black transition duration-300" />
                        </div>
                      </a>
                    </div>

                    {/* Text Card */}
                    <div className="bg-white rounded-b-lg pt-2 pb-2 px-4 text-start">
                      <h4 className="font-sans text-lg text-blue-950 mb-1">
                        {project.company_name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {project.description ||
                          "Explore this exciting project for your portfolio!"}
                      </p>
                      <a
                        href={project.payment_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-tr from-violet-500 to-green-500 hover:bg-violet-700 text-white px-4 py-2 rounded-md transition"
                      >
                        Get Code
                      </a>
                    </div>
                  </>
                ) : (
                  // Fallback for non-dashboard
                  <div className="p-2">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-sans text-lg text-blue-950">
                        {project.company_name}
                      </h4>
                      <div className="flex space-x-2">
                        <a
                          href={project.youtube_video_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white bg-red-500 p-1 rounded-full hover:bg-red-600 flex items-center group transition"
                        >
                          <span className="overflow-hidden whitespace-nowrap text-white transition-all group-hover:ml-2 group-hover:w-auto w-0 group-hover:mr-2">
                            Details
                          </span>
                          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-red-500 group-hover:border-2 border-white">
                            <FaYoutube size={16} />
                          </div>
                        </a>
                        <a
                          href={project.payment_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white bg-violet-500 p-1 rounded-full hover:bg-violet-700 flex items-center group transition"
                        >
                          <span className="overflow-hidden whitespace-nowrap text-white transition-all group-hover:ml-2 group-hover:w-auto w-0 group-hover:mr-2">
                            GetCode
                          </span>
                          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-violet-500 group-hover:border-2 border-white">
                            <FaCode size={16} />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default Projects;
