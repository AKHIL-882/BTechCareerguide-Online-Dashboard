import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/HomePage/Home";
import Dashboard from "./Components/User/Dashboard";
import AdminDashBoard from "./Components/Admin/Pages/AdminDashBoard";
import MainLayout from "./Components/Admin/Pages/MainLayout";
import AdminJobs from "./Components/Admin/Pages/AdminJobs";
import AdminProjects from "./Components/Admin/Pages/AdminProjects";
import AdminCompanyQa from "./Components/Admin/Pages/AdminCompanyQa";
import ProtectedRoute from "./Components/ProtectedRoute";
import Jobs from "./Components/User/Jobs";
import ProjectHome from "./Components/User/ProjectHome";
import CompanyQA from "./Components/User/CompanyQA";
import { AuthProvider } from "./Components/AuthContext";
import UserMainLayout from "./Components/User/UserMainLayout";
import { useEffect } from "react";
import { useTokenManager } from "./Api";
import UserProjectsPage from "./Components/Admin/Pages/UserProjectsPage";

function App() {
  const { initializeTokenManagement } = useTokenManager();

  useEffect(() => {
    initializeTokenManagement();
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashBoard />} />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/companyqa" element={<AdminCompanyQa />} />
          <Route path="/admin/user-projects" element={<UserProjectsPage />} />
        </Route>
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRole="user">
              <UserMainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/user" element={<Dashboard />} />
          <Route path="/user/jobs" element={<Jobs />} />
          <Route path="/user/projects" element={<ProjectHome />} />
          <Route path="/user/company-qa" element={<CompanyQA />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
