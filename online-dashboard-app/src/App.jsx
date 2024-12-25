import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Dashboard from "./Components/User/Dashboard";
import AdminDashBoard from "./Components/Admin/Adminpages/AdminDashBoard";
import MainLayout from "./Components/Admin/Adminpages/MainLayout";
import AdminProjects from "./Components/Admin/Adminpages/AdminProjects";
import AdminCompanyQa from "./Components/Admin/Adminpages/AdminCompanyQa";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route path="/admin" element={<AdminDashBoard />} />
          <Route path="/admin/projects" element={<AdminProjects/>}/>
          <Route path="/admin/companyqa" element={<AdminCompanyQa/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
