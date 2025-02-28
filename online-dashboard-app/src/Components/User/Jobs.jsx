import JobsTable from "./JobsTable.jsx";
import Spinner from "../Admin/Components/Spinner.jsx";
import { useFetchJobs } from "../../Api.jsx";
import { FaBriefcase, FaAngleDoubleRight } from "react-icons/fa";

const Jobs = ({ handleLogout }) => {
  const { jobListings, loading, error } = useFetchJobs();
  return (
    <main className="m-3 flex-1 pt-14 lg:relative lg:pl-56 py-2 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-blue-950 mb-2 relative flex items-center space-x-2 p-2">
        <FaBriefcase className="text-violet-600 w-6 h-6 mb-2" />
        <span className="mb-1">Available Jobs</span>
        <FaAngleDoubleRight className="text-violet-600 w-5 h-5 ml-2" />
      </h2>
      <h1>Filters</h1>
      </div>
      {loading ? (
        <p className="flex items-center justify-center p-5">
          <Spinner loading={loading} color={"#0000FF"} size={20} />
          <span className="pl-1">Jobs...</span>
        </p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <JobsTable jobs={jobListings} />
      )}
    </main>
  );
};

export default Jobs;
