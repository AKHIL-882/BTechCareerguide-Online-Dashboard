import React, { useEffect, useState } from "react";
import ShimmerProjects from "./ShimmerProjects";
import SearchProjects from "./SearchProjects";
import { FaYoutube, FaCode, FaSearch, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import YouTubePopupPlayer from "./YouTubePopupPlayer";
import { API_BASE_URL } from "../../api/apiConfig";

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

        const response = await fetch(`${API_BASE_URL}/admin-projects`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          localStorage.clear();
          navigate("/");
        }

        const responseData = await response.json();
        isDashBoard
          ? setProjects(responseData.data.slice(0, 3))
          : (setProjects(responseData.data), setNoSearchedProjects(responseData.data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [isDashBoard, navigate]);

  if (error) {
    return <p>Error fetching projects: {error}</p>;
  }

  // ✅ Safe YouTube ID extractor
  const getYouTubeId = (url) => {
    if (!url) return null;
    try {
      const u = new URL(url.trim());
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      if (u.pathname.includes("/embed/")) return u.pathname.split("/").pop();
      return null;
    } catch {
      return url; // fallback if only videoId is stored
    }
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
          <SectionHeading text="available projects" />
          <SearchProjects setProjects={setProjects} noSearchedProjectsfn={noSearchedProjectsfn} />
        </div>
      )}

      {loading ? (
        <ShimmerProjects isDashBoard={isDashBoard} count={3} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isEmptySearch && flattenedProjects.length === 0 ? (
            <div className="flex items-center justify-center col-span-full h-auto">
              <div className="flex flex-col items-center justify-center p-4 space-y-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
                <h1 className="text-lg font-sans text-gray-700 dark:text-gray-300 flex justify-center items-center">
                  <FaSearch className="text-gray-400 dark:text-gray-500 text-2xl mr-2" />{" "}
                  <span>No Projects Found</span>
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
                  We couldn't find any projects. Try searching for something else.
                </p>
              </div>
            </div>
          ) : (
            Array.isArray(flattenedProjects) &&
            flattenedProjects.map((project, index) => {
              const videoId = getYouTubeId(project.youtube_video_link);

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden p-1 relative border border-gray-200 dark:border-gray-800 text-slate-900 dark:text-slate-100"
                >
                  {/* Thumbnail */}
                  <div className="w-full h-48 rounded-t-lg relative">
                    <img
                      src={
                        videoId
                          ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                          : "/fallback-thumbnail.jpg"
                      }
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover"
                    />

                    {/* Play Button at Bottom-Center */}
                    {videoId && (
                      <YouTubePopupPlayer
                        title={project.company_name}
                        videoUrl={project.youtube_video_link}
                      >
                        <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2">
                          <div className="group relative w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-tr from-white to-gray-100 dark:from-gray-100 dark:to-gray-200 shadow-lg hover:shadow-[0_0_25px_10px_rgba(255,0,102,0.5)] hover:from-pink-100 hover:to-purple-200 transition-all duration-500 ease-in-out">
                            <div className="absolute w-full h-full rounded-full bg-pink-400 opacity-20 blur-xl scale-0 group-hover:scale-100 transition-transform duration-700 ease-out"></div>
                            <FaPlay className="relative text-violet-600 text-2xl group-hover:text-black transition duration-300" />
                          </div>
                        </div>
                      </YouTubePopupPlayer>
                    )}
                  </div>

                  {/* Text Card */}
                  <div className="bg-white dark:bg-gray-900 rounded-b-lg pt-2 pb-2 px-4 text-start">
                    <h4 className="font-sans text-lg text-blue-950 dark:text-blue-300 mb-1">{project.company_name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {project.description || "Explore this exciting project for your portfolio!"}
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
                </div>
              );
            })
          )}
        </div>
      )}
    </section>
  );
};

export default Projects;
