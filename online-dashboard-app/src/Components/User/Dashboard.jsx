import Projects from "./Projects";
import JobsTable from "./JobsTable.jsx";
import { useFetchJobs } from "../../Api.jsx";
import ShimmerJobs from "./ShimmerJobs.jsx";
import SectionHeading from "./SectionHeading.jsx";
import WelcomeCard from "./WelcomeCard.jsx";
import { FaAngleRight } from "react-icons/fa";
import StatsOverlayCards from "./StatsOverlayCards.jsx";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { jobListings, loading, error } = useFetchJobs();

  return (
    <main className="m-3 flex-1 pt-12 lg:relative py-2 bg-slate-50 min-h-screen">
      <div className="relative">
        <WelcomeCard
          name="Akhil"
          message="Hope you're making great progress in your career journey!"
          imageUrl="https://img.freepik.com/free-psd/3d-rendering-graduate-character_23-2151363355.jpg?t=st=1745316799~exp=1745320399~hmac=ee170d8307335bde7ebf997bf939860595c9f34597759c4ca19e00f1666efe36&w=740"
        />
        <StatsOverlayCards />
      </div>
      <div className="mt-40 sm:mt-14">
        <div className="flex justify-between items-center">
          <SectionHeading text="trending jobs" />
          <Link
            className="text-violet-500 mb-4"
            to="/user/jobs"
            title="view all jobs"
          >
            <FaAngleRight size={20} />
          </Link>
        </div>
        {loading ? (
          <ShimmerJobs isDashBoard={true} />
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : (
          <JobsTable jobs={jobListings.slice(0, 3)} />
        )}
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <SectionHeading text="latest projects" />
          <Link
            className="text-violet-500 mb-4"
            to="/user/projects"
            title="view all projects"
          >
            <FaAngleRight size={20} />
          </Link>
        </div>
        <Projects isDashBoard={true} />
      </div>
    </main>
  );
};

export default Dashboard;
