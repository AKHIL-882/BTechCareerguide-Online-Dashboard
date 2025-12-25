import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "@/shared/components/molecules/ScrollToTopButton";
import Footer from "@/shared/components/organisms/Footer";
import Header from "../Components/Header";
import SidebarFixed from "../Components/SidebarFixed";

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
