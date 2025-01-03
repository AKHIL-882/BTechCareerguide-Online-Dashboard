import {React,useState} from "react";
import AddJobForm from "../Components/DashBoard/AddJobForm";
import JobListing from "../Components/DashBoard/JobListing";
import { useFetchJobs } from "../../../Api";
const AdminJobs = () => {
  const {jobListings,setJobListings, loading, error } = useFetchJobs();
  const addJob = (newJob) => {
    setJobListings((prevJobs) => [newJob,...prevJobs]);
  };
  return <div className="pt-16 pb-5 px-4 lg:pl-60 w-screen">
  <h1 className="lg:hidden font-bold text-white bg-gradient-to-r from-violet-600 pl-2 mt-2 rounded-md" >Jobs</h1>
   <AddJobForm addJob={addJob}/>
   <JobListing jobListings={jobListings} setJobListings={setJobListings} loading={loading} error={error}/>
  </div>;
};

export default AdminJobs;
