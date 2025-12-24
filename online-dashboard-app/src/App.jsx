import { Route, Routes } from "react-router-dom"; // remove BrowserRouter here
import Home from "@/features/marketing/Home";
import Dashboard from "@/features/user/Dashboard";
import AdminDashBoard from "@/features/admin/Pages/AdminDashBoard";
import MainLayout from "@/features/admin/Pages/MainLayout";
import AdminJobs from "@/features/admin/Pages/AdminJobs";
import AdminProjects from "@/features/admin/Pages/AdminProjects";
import AdminCompanyQa from "@/features/admin/Pages/AdminCompanyQa";
import ProtectedRoute from "@/shared/routing/ProtectedRoute";
import Jobs from "@/features/user/Jobs";
import ProjectHome from "@/features/user/ProjectHome";
import CompanyQA from "@/features/user/CompanyQA";
import { AuthProvider } from "@/shared/context/AuthContext";
import UserMainLayout from "@/features/user/UserMainLayout";
import AdminMaterials from "@/features/admin/Pages/AdminMaterials";
import CalendarBooking from "@/features/user/CalendarBooking";
import AdminSlots from "@/features/admin/Pages/AdminSlots";
import UserTestimonials from "@/features/user/UserTestimonials";
import NewPasswordForm from "@/features/marketing/NewPasswordForm";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/new-password" element={<NewPasswordForm />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashBoard />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="companyqa" element={<AdminCompanyQa />} />
          <Route path="materials" element={<AdminMaterials />} />
          <Route path="slots" element={<AdminSlots />} />
        </Route>

        {/* User Routes */}
        <Route
          element={
            <ProtectedRoute allowedRole="user">
              <UserMainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/projects" element={<ProjectHome />} />
          <Route path="/company-qa" element={<CompanyQA />} />
          <Route path="/calendar" element={<CalendarBooking />} />
          <Route path="/testimonials" element={<UserTestimonials />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
