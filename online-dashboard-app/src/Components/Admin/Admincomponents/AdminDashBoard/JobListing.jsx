import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import JobTable from "./JobTable";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import EditJobPopup from "./EditJobPopup"; // Import EditJobPopup component
import DeleteJobPopup from "./DeleteJobPopup"; // Import DeleteJobPopup component

const JobListing = () => {
  const [jobListings, setJobListings] = useState([
    {
      id: 1,
      companyName: "Company A",
      role: "Software Engineer",
      qualifications: ["Bachelor's", "Master's"],
      batches: ["2024", "2023"],
      experience: "2.5",
      url: "https://www.companyA.com/job",
    },
    {
      id: 2,
      companyName: "Company B",
      role: "Product Manager",
      qualifications: ["Master's"],
      batches: ["2023"],
      experience: "3",
      url: "https://www.companyB.com/job",
    },
    {
      id: 3,
      companyName: "Company C",
      role: "Data Scientist",
      qualifications: ["PhD"],
      batches: ["2025"],
      experience: "4",
      url: "https://www.companyC.com/job",
    },
    {
      id: 4,
      companyName: "Company D",
      role: "UX Designer",
      qualifications: ["Bachelor's"],
      batches: ["2023"],
      experience: "2",
      url: "https://www.companyD.com/job",
    },
    {
      id: 5,
      companyName: "Company E",
      role: "Marketing Manager",
      qualifications: ["Master's"],
      batches: ["2022"],
      experience: "3.5",
      url: "https://www.companyE.com/job",
    },
    {
      id: 6,
      companyName: "Company F",
      role: "HR Specialist",
      qualifications: ["Bachelor's"],
      batches: ["2021"],
      experience: "5",
      url: "https://www.companyF.com/job",
    },
    {
        id: 7,
        companyName: "Company F",
        role: "HR Specialist",
        qualifications: ["Bachelor's"],
        batches: ["2021"],
        experience: "5",
        url: "https://www.companyF.com/job",
      },
      {
        id: 8,
        companyName: "Company F",
        role: "HR Specialist",
        qualifications: ["Bachelor's"],
        batches: ["2021"],
        experience: "5",
        url: "https://www.companyF.com/job",
      },
      {
        id: 9,
        companyName: "Company F",
        role: "HR Specialist",
        qualifications: ["Bachelor's"],
        batches: ["2021"],
        experience: "5",
        url: "https://www.companyF.com/job",
      },
      {
        id: 10,
        companyName: "Company F",
        role: "HR Specialist",
        qualifications: ["Bachelor's"],
        batches: ["2021"],
        experience: "5",
        url: "https://www.companyF.com/job",
      },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null); // State to hold selected job for editing
  const [showDeletePopup, setShowDeletePopup] = useState(false); // State to manage delete popup visibility
  const [jobToDelete, setJobToDelete] = useState(null); // Job to be deleted
  const jobsPerPage = 3;

  // Get the jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobListings.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobListings.length / jobsPerPage);

  const handleEdit = (id) => {
    const jobToEdit = jobListings.find((job) => job.id === id);
    setSelectedJob(jobToEdit); // Set the selected job for editing
  };

  const handleDelete = (id) => {
    setJobListings(jobListings.filter((job) => job.id !== id));
    setShowDeletePopup(false); // Close delete popup after deletion
    setJobToDelete(null); // Reset the job to delete
  };

  const handleSaveJob = (updatedJob) => {
    setJobListings(
      jobListings.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
    setSelectedJob(null); // Close the popup after saving
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
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>

      {/* Job Table (Desktop View) */}
      <JobTable
        currentJobs={currentJobs}
        handleEdit={handleEdit}
        openDeletePopup={openDeletePopup} // Pass openDeletePopup to trigger the delete popup
      />

      {/* Job Cards (Mobile View) */}
      <JobCard
        currentJobs={currentJobs}
        handleEdit={handleEdit}
        openDeletePopup={openDeletePopup} // Pass openDeletePopup to trigger the delete popup
      />

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
