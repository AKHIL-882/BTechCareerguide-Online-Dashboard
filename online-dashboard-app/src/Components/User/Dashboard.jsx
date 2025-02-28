import Projects from "./Projects";
import JobsTable from "./JobsTable.jsx";
import { Link } from "react-router-dom";
import Spinner from "../Admin/Components/Spinner.jsx";
import { useFetchJobs } from "../../Api.jsx";
import {
  FaBriefcase,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaProjectDiagram,
} from "react-icons/fa";

const Dashboard = () => {
  const { jobListings, loading, error } = useFetchJobs();

  return (
    <main className="m-3 flex-1 pt-14 lg:relative lg:pl-56 py-2 bg-slate-50 min-h-screen">
      <div className="py-1">
        <h2 className="text-xl md:text-2xl font-bold text-blue-950 mb-2 flex items-center space-x-2 p-2">
          <FaProjectDiagram className="text-violet-600 w-6 h-6 md:w-8 md:h-8" />
          <span>Latest Projects</span>
          <FaAngleDoubleRight className="text-violet-600 w-5 h-5 md:w-6 md:h-6" />
        </h2>
        <Projects isDashBoard={true} />
      </div>
      <div className="mt-4">
        <h2 className="text-xl md:text-2xl font-bold text-blue-950 mb-2 flex items-center space-x-2 p-2">
          <FaBriefcase className="text-violet-600 w-6 h-6 md:w-8 md:h-8" />
          <span>Recent Jobs</span>
          <FaAngleDoubleRight className="text-violet-600 w-5 h-5 md:w-6 md:h-6" />
        </h2>
        {loading ? (
          <div className="flex items-center justify-center p-5">
            <Spinner loading={loading} color={"#0000FF"} size={20} />
            <span className="pl-2 text-lg text-gray-600">Loading Recent Jobs...</span>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : (
          <JobsTable jobs={jobListings.slice(0, 3)} className="p-4" />
        )}
      </div>
      {!error && !loading && jobListings.length > 0 && (
        <Link to={"/user/jobs"}>
          <div className="bg-violet-600 mt-2 p-3 rounded-lg hover:opacity-90 transition duration-300 ease-in-out shadow-md cursor-pointer flex items-center justify-center space-x-4 group mx-2 md:mx-auto md:w-1/2">
            <FaAngleDoubleLeft className="text-white w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition duration-300 ease-in-out" />
            <p className="text-white font-semibold text-lg md:text-xl">View More Jobs</p>
            <FaAngleDoubleRight className="text-white w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition duration-300 ease-in-out" />
          </div>
        </Link>
      )}
    </main>
  );
};

export default Dashboard;
