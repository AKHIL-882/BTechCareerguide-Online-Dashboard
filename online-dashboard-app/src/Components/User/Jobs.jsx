import JobsTable from "./JobsTable.jsx";
import Spinner from "../Admin/Components/Spinner.jsx";
import { useFetchJobs } from "../../Api.jsx";

const Jobs = ({ handleLogout }) => {
  const { jobListings, loading, error } = useFetchJobs();
  return (
    <main className="m-2 flex-1 pt-14 lg:relative lg:pl-56 py-2 bg-slate-50 min-h-screen">
      <h1 className="text-xl font-bold mb-2 lg:mb-2 lg:ml-0 text-white bg-gradient-to-r from-blue-500 rounded pl-2 ">
        Available Jobs
      </h1>
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
