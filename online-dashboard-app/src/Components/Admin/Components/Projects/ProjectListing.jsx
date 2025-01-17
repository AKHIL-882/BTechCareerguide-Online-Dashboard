import React, { useState } from "react";
import ProjectTable from "../Projects/ProjectTable";
import ProjectCard from "../Projects/ProjectCard";
import Pagination from "../DashBoard/Pagination";
import EditProjectPopup from "./EditProjectPopup";
import DeleteProjectPopup from "./DeleteProjectPopup";
import { useSaveProject, useDeleteProject } from "../../../../Api";
import Spinner from "../Spinner";

const ProjectListing = ({
  projectsListings,
  setProjectsListings,
  loading,
  error,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const ProjectsPerPage = 10;
  const totalPages = Math.ceil(projectsListings.length / ProjectsPerPage);

  const indexOfLastProject = currentPage * ProjectsPerPage;
  const indexOfFirstProject = indexOfLastProject - ProjectsPerPage;
  const currentProjects = projectsListings.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const { deleteProject } = useDeleteProject();
  const { saveProject } = useSaveProject();

  const handleEdit = (id) => {
    const projectToEdit = projectsListings.find((project) => project.id === id);
    setSelectedProject(projectToEdit);
  };

  const handleDelete = (id) => {
    deleteProject(
      id,
      projectsListings,
      setProjectsListings,
      setShowDeletePopup,
      setProjectToDelete
    );
  };

  const handleSaveProject = (updatedProject) => {
    saveProject(
      updatedProject,
      setProjectsListings,
      projectsListings,
      setSelectedProject
    );
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openDeletePopup = (project) => {
    setProjectToDelete(project);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setProjectToDelete(null);
  };

  return (
    <div className="mx-auto p-4 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4 text-gray-900">
        Project Listings{" "}
        <span className="text-sm text-gray-800">
          ({projectsListings.length})
        </span>
      </h1>

      {loading ? (
        <p className="flex items-center justify-center p-5">
          <Spinner loading={loading} color={"#800080"} size={20} />
          <span className="pl-1">Loading Projects...</span>
        </p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <ProjectTable
            currentProjects={currentProjects}
            handleEdit={handleEdit}
            openDeletePopup={openDeletePopup}
          />
          <ProjectCard
            currentProjects={currentProjects}
            handleEdit={handleEdit}
            openDeletePopup={openDeletePopup}
          />
        </>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      {selectedProject && (
        <EditProjectPopup
          project={selectedProject}
          handleClose={() => setSelectedProject(null)}
          handleSave={handleSaveProject}
        />
      )}

      {showDeletePopup && (
        <DeleteProjectPopup
          project={projectToDelete}
          handleClose={closeDeletePopup}
          handleDelete={() => handleDelete(projectToDelete.id)}
        />
      )}
    </div>
  );
};

export default ProjectListing;
