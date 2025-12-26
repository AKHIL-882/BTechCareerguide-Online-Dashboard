import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowUpRight, BadgeCheck } from "lucide-react";
import ShimmerProjects from "./ShimmerProjects";
import SearchProjects from "./SearchProjects";
import SectionHeading from "./SectionHeading";
import YouTubePopupPlayer from "./YouTubePopupPlayer";
import { fetchAdminProjectsList } from "@/api/projectApi";

const Projects = ({ isDashBoard }) => {
  const [projects, setProjects] = useState([]);
  const [noSearchedProjects, setNoSearchedProjects] = useState([]);
  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const localData = localStorage.getItem("data");
      const accessToken = localData ? JSON.parse(localData)?.access_token : null;
      if (!accessToken) {
        navigate("/");
        throw new Error("Missing access token");
      }
      try {
        const response = await fetchAdminProjectsList(accessToken);
        return response.data;
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/");
        }
        throw err;
      }
    },
  });

  useEffect(() => {
    if (!data?.data) return;
    const incoming = Array.isArray(data.data) ? data.data : [];
    const sliced = isDashBoard ? incoming.slice(0, 3) : incoming;
    setProjects(sliced);
    setNoSearchedProjects(incoming);
  }, [data, isDashBoard]);

  if (error) {
    return <p>Error fetching projects: {error.message}</p>;
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
    <section className="space-y-5">
      {!isDashBoard && (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-800 to-violet-700 text-white px-6 py-6 shadow-xl">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_10%_20%,_#fff_0,_transparent_30%),radial-gradient(circle_at_70%_20%,_#fff_0,_transparent_30%),radial-gradient(circle_at_50%_70%,_#fff_0,_transparent_30%)]" />
            <div className="relative flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] bg-white/15 rounded-full px-3 py-1 backdrop-blur">
                  <Sparkles size={14} /> Portfolio lab
                </div>
                <h1 className="text-3xl font-semibold leading-tight">Launch projects that recruiters notice.</h1>
                <p className="text-white/80 max-w-2xl">
                  Watch the walkthrough, grab the code, and tailor the solution to your stack. New drops land regularly—filter and start building.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm bg-white/10 rounded-full px-3 py-1 border border-white/20">
                <BadgeCheck size={16} /> Curated by mentors
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeading text="available projects" />
            <SearchProjects setProjects={setProjects} noSearchedProjectsfn={noSearchedProjectsfn} />
          </div>
        </div>
      )}

      {isLoading ? (
        <ShimmerProjects isDashBoard={isDashBoard} count={3} />
      ) : (
        <div
          className={
            isDashBoard
              ? "flex gap-4 overflow-x-auto pb-2 min-w-[260px]"
              : `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`
          }
        >
          {isEmptySearch && flattenedProjects.length === 0 ? (
            <div className="flex items-center justify-center col-span-full h-auto">
              <div className="flex flex-col items-center justify-center p-4 space-y-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
                <h1 className="text-lg font-sans text-gray-700 dark:text-gray-300 flex justify-center items-center">
                  <FaSearch className="text-gray-400 dark:text-gray-500 text-2xl mr-2" />{" "}
                  <span>No Projects Found</span>
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
                  We couldn&apos;t find any projects. Try searching for something else.
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
                  className={`relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                    isDashBoard ? "min-w-[260px]" : ""
                  }`}
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={
                        videoId
                          ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                          : "/fallback-thumbnail.jpg"
                      }
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    {videoId && (
                      <YouTubePopupPlayer title={project.company_name} videoUrl={project.youtube_video_link}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="group relative w-14 h-14 rounded-full flex items-center justify-center bg-white/90 text-indigo-700 shadow-lg hover:scale-105 transition">
                            <div className="absolute inset-0 rounded-full bg-indigo-100 opacity-70 blur-xl group-hover:opacity-90" />
                            <FaPlay className="relative text-lg" />
                          </div>
                        </div>
                      </YouTubePopupPlayer>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                          {project.company_name}
                        </p>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          {project.title || "Project drop"}
                        </h4>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                        {project?.payment_link ? "Code ready" : "Preview"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {project.description || "Explore this exciting project for your portfolio!"}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {project.youtube_video_link ? "Watch walkthrough" : "Project brief"}
                      </span>
                      <a
                        href={project.payment_link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 dark:text-indigo-200 hover:underline"
                      >
                        Get Code <ArrowUpRight size={14} />
                      </a>
                    </div>
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
