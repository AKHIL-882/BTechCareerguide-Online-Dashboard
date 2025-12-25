import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "@/shared/components/molecules/ScrollToTopButton";
import Footer from "@/shared/components/organisms/Footer";
import Header from "../Components/Header";
import SidebarFixed from "../Components/SidebarFixed";
import { useLogout } from "@/hooks/useAuth";

const MainLayout = () => {
  const { logout } = useLogout();

  return (
    <>
      <ScrollToTopButton colorCode="bg-violet-800" />
      <Header onLogout={logout} />
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
