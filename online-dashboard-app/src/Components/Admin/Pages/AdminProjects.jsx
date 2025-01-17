import React from "react";
import AddProjects from "../Components/Projects/AddProjects";
import ProJectListing from "../Components/Projects/ProjectListing";
import { useFetchProjects } from "../../../Api";
const AdminProjects = () => {
  const { projectsListings, setProjectsListings, loading, error } =
    useFetchProjects();
  const addProject = (newProject) => {
    setProjectsListings((prevProjects) => [newProject, ...prevProjects]);
  };
  return (
    <div className="pt-16 pb-5 px-4 lg:pl-60 w-screen">
      <h1 className="lg:hidden font-bold text-white bg-gradient-to-r from-violet-600 pl-2 mt-2 rounded-md">
        Projects
      </h1>
      <AddProjects addProject={addProject} />
      <ProJectListing
        projectsListings={projectsListings}
        setProjectsListings={setProjectsListings}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default AdminProjects;
