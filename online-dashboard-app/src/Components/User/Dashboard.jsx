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
        <h2 className="text-xl font-bold text-blue-950 mb-2 relative flex items-center space-x-2 p-2">
          <FaProjectDiagram className="text-violet-600 w-6 h-6 mb-2" />
          <span className="mb-1">Latest Projects</span>
          <FaAngleDoubleRight className="text-violet-600 w-5 h-5 ml-2" />
        </h2>
        <Projects isDashBoard={true} />
      </div>
      <div className="mt-2">
        <h2 className="text-xl font-bold text-blue-950 mb-2 relative flex items-center space-x-2 p-2">
          <FaBriefcase className="text-violet-600 w-6 h-6 mb-2" />
          <span className="mb-1">Recent Jobs</span>
          <FaAngleDoubleRight className="text-violet-600 w-5 h-5 ml-2" />
        </h2>
        {loading ? (
          <p className="flex items-center justify-center p-5">
            <Spinner loading={loading} color={"#0000FF"} size={20} />
            <span className="pl-1">Recentjobs...</span>
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <JobsTable jobs={jobListings.slice(0, 3)} className="p-4" />
        )}
      </div>
      {!error && !loading && jobListings ? (
        <Link to={"/user/jobs"}>
          <div className="bg-violet-600 p-2 rounded-b-lg hover:opacity-90 transition duration-300 ease-in-out shadow-md cursor-pointer flex items-center justify-center space-x-4 group">
            <FaAngleDoubleLeft className="text-white w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition duration-300 ease-in-out" />
            <p className="text-white font-semibold text-lg">View More Jobs</p>
            <FaAngleDoubleRight className="text-white w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition duration-300 ease-in-out" />
          </div>
        </Link>
      ) : (
        ""
      )}
    </main>
  );
};

export default Dashboard;
