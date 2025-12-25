import React, { useState } from "react";
import JobTable from "./JobTable";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import EditJobPopup from "./EditJobPopup"; // Import EditJobPopup component
import DeleteJobPopup from "./DeleteJobPopup"; // Import DeleteJobPopup component
import { useSaveJob, useDeleteJob } from "../../../../hooks/useJob.js";
import Spinner from "@/shared/components/atoms/Spinner";

const JobListing = ({ jobListings, setJobListings, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null); // State to hold selected job for editing
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State to manage delete popup visibility
  const [jobToDelete, setJobToDelete] = useState(null); // Job to be deleted
  const jobsPerPage = 10;

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobListings.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobListings.length / jobsPerPage);

  const handleEdit = (id) => {
    const jobToEdit = jobListings.find((job) => job.id === id);
    setSelectedJob(jobToEdit); // Set the selected job for editing
  };

  const { deleteJob } = useDeleteJob();
  const handleDelete = (id) => {
    deleteJob(
      id,
      jobListings,
      setJobListings,
      setShowDeletePopup,
      setJobToDelete,
    );
  };

  const { saveJob } = useSaveJob();
  const handleSaveJob = (updatedJob) => {
    saveJob(updatedJob, setJobListings, jobListings, setSelectedJob);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openDeletePopup = (job) => {
    setJobToDelete(job); // Set the job to be deleted
    setShowDeletePopup(true); // Open the delete popup
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false); // Close the delete popup without making changes
    setJobToDelete(null); // Reset the job to delete
  };

  return (
    <div className="mx-auto p-4 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4 text-gray-900">
        Job Listings{" "}
        <span className="text-sm text-gray-800">({jobListings.length})</span>
      </h1>

      {/* Job Table (Desktop View) */}
      {loading ? (
        <p className="flex items-center justify-center p-5">
          <Spinner loading={loading} color={"#800080"} size={20} />
          <span className="pl-1">Loading jobs...</span>
        </p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <JobTable
            currentJobs={currentJobs}
            handleEdit={handleEdit}
            openDeletePopup={openDeletePopup} // Pass openDeletePopup to trigger the delete popup
          />
          <JobCard
            currentJobs={currentJobs}
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

      {/* Edit Job Popup Modal */}
      {selectedJob && (
        <EditJobPopup
          job={selectedJob}
          handleClose={() => setSelectedJob(null)}
          handleSave={handleSaveJob}
        />
      )}

      {/* Delete Job Popup Modal */}
      {showDeletePopup && (
        <DeleteJobPopup
          job={jobToDelete}
          handleClose={closeDeletePopup}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default JobListing;
