import React from "react";
import AddProjects from "../Components/Projects/AddProjects";
import ProJectListing from "../Components/Projects/ProjectListing";
import { useFetchProjects } from "../../../hooks/useProject.js";
const AdminProjects = () => {
  const { projectsListings, setProjectsListings, loading, error } =
    useFetchProjects();
  const addProject = (newProject) => {
    setProjectsListings((prevProjects) => [newProject, ...prevProjects]);
  };
  return (
    <div className="pt-16 pb-8 px-4 lg:pl-60 w-screen space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white shadow-lg px-6 py-6">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_left,_#fff_0,_transparent_35%),radial-gradient(circle_at_bottom_right,_#fff_0,_transparent_30%)]" />
        <div className="relative space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">
            Admin · Projects
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold">Manage Projects</h1>
          <p className="text-sm text-white/80 max-w-2xl">
            Add new projects, update payment links, and keep users in sync.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Add a new project
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Capture project name, YouTube link, and payment link.
            </p>
            <AddProjects addProject={addProject} />
          </div>
        </div>
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Project catalog
              </h2>
              <span className="text-xs text-gray-500">
                {projectsListings?.length || 0} total
              </span>
            </div>
            <ProJectListing
              projectsListings={projectsListings}
              setProjectsListings={setProjectsListings}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
