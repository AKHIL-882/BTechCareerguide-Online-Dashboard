import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Dashboard from "./Components/User/Dashboard";
import AdminDashBoard from "./Components/Admin/Adminpages/AdminDashBoard";
import MainLayout from "./Components/Admin/Adminpages/MainLayout";
import AdminProjects from "./Components/Admin/Adminpages/AdminProjects";
import AdminCompanyQa from "./Components/Admin/Adminpages/AdminCompanyQa";
import ProtectedRoute from "./Components/ProtectedRoute";
import Jobs from "./Components/User/Jobs";
import ProjectHome from "./Components/User/ProjectHome";
import CompanyQA from "./Components/User/CompanyQA";
import { AuthProvider } from "./Components/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<MainLayout />}>
            <Route path="/admin" element={<AdminDashBoard />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/companyqa" element={<AdminCompanyQa />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/projects" element={<ProjectHome />} />
          <Route path="/company-qa" element={<CompanyQA />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
