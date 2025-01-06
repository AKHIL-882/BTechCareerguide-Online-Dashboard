import Projects from "./Projects";
import JobsTable from "./JobsTable.jsx";
import { Link } from "react-router-dom";
import Spinner from "../Admin/Components/Spinner.jsx";
import { useFetchJobs } from "../../Api.jsx";

const Dashboard = () => {
  const {jobListings,loading, error } = useFetchJobs();
  return (
    <main className="m-2 flex-1 pt-14 lg:relative lg:pl-56 py-2 bg-slate-50 min-h-screen">
      <div className="p-4">
        <Projects />
      </div>
      <div className="mt-2">
        <h1 className="text-xl font-bold ml-4 lg:mb-2 lg:ml-0 text-white bg-gradient-to-r from-blue-500 rounded pl-2 ">
          Recent Jobs
        </h1>
        {loading ? (
          <p className="flex items-center justify-center p-5">
            <Spinner loading={loading} color={"#0000FF"} size={20} />
            <span className="pl-1">Recentjobs...</span>
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <JobsTable jobs={jobListings.slice(0, 4)} className="p-4" />
        )}
      </div>
      {!error && !loading && jobListings ? (
        <Link to={"/user/jobs"}>
          <div className="bg-indigo-500 p-2 my-2 rounded-xl hover:opacity-80 ">
            <p className="text-center text-white cursor-pointer">
              Browse All Jobs
            </p>
          </div>
        </Link>
      ) : (
        ""
      )}
    </main>
  );
};

export default Dashboard;
