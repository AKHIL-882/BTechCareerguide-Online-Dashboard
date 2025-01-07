import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import SidebarFixed from "../Components/SidebarFixed";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../Components/ScrollToTopButton";

const MainLayout = () => {
  return (
    <>
      <ScrollToTopButton colorCode="bg-violet-800" />
      <Header />
      <div className="flex">
        <SidebarFixed />
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
