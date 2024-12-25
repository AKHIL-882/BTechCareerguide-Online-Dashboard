import Header from "../Admincomponents/Header";
import Footer from "../Admincomponents/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };
  
  export default MainLayout;