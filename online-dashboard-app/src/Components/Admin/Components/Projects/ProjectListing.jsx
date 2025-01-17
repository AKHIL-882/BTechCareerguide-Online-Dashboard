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
  const [selectedProject, setSelectedProject] = useState(null); // State to hold selected Project for editing
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State to manage delete popup visibility
  const [projectToDelete, setProjectToDelete] = useState(null); // Project to be deleted
  const ProjectsPerPage = 10;
  // Get the projects for the current page
  const indexOfLastProject = currentPage * ProjectsPerPage;
  const indexOfFirstProject = indexOfLastProject - ProjectsPerPage;
  const currentProjects = projectsListings.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );
  const totalPages = Math.ceil(projectsListings.length / ProjectsPerPage);

  const handleEdit = (id) => {
    const projectToEdit = projectsListings.find((project) => project.id === id);
    setSelectedProject(projectToEdit); // Set the selected project for editing
  };

  const { deleteProject } = useDeleteProject();
  const handleDelete = (id) => {
    deleteProject(
      id,
      projectsListings,
      setProjectsListings,
      setShowDeletePopup,
      setProjectToDelete,
    );
  };

  const { saveProject } = useSaveProject();
  const handleSaveProject = (updatedProject) => {
    saveProject(
      updatedProject,
      setProjectsListings,
      projectsListings,
      setSelectedProject,
    );
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openDeletePopup = (project) => {
    setProjectToDelete(project); // Set the project to be deleted
    setShowDeletePopup(true); // Open the delete popup
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false); // Close the delete popup without making changes
    setProjectToDelete(null); // Reset the project to delete
  };

  return (
    <div className="mx-auto p-4 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4 text-gray-900">
        Project Listings{" "}
        <span className="text-sm text-gray-800">
          ({projectsListings.length})
        </span>
      </h1>

      {/* Project Table (Desktop View) */}
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
            openDeletePopup={openDeletePopup} // Pass openDeletePopup to trigger the delete popup
          />
          <ProjectCard
            currentProjects={currentProjects}
            handleEdit={handleEdit}
            openDeletePopup={openDeletePopup} // Pass openDeletePopup to trigger the delete popup
          />
        </>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      {/* Edit Project Popup Modal */}
      {selectedProject && (
        <EditProjectPopup
          project={selectedProject}
          handleClose={() => setSelectedProject(null)}
          handleSave={handleSaveProject}
        />
      )}

      {/* Delete Project Popup Modal */}
      {showDeletePopup && (
        <DeleteProjectPopup
          project={projectToDelete}
          handleClose={closeDeletePopup}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ProjectListing;
