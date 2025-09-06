// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./Components/HomePage/Home";
// import Dashboard from "./Components/User/Dashboard";
// import AdminDashBoard from "./Components/Admin/Pages/AdminDashBoard";
// import MainLayout from "./Components/Admin/Pages/MainLayout";
// import AdminJobs from "./Components/Admin/Pages/AdminJobs";
// import AdminProjects from "./Components/Admin/Pages/AdminProjects";
// import AdminCompanyQa from "./Components/Admin/Pages/AdminCompanyQa";
// import ProtectedRoute from "./Components/ProtectedRoute";
// import Jobs from "./Components/User/Jobs";
// import ProjectHome from "./Components/User/ProjectHome";
// import CompanyQA from "./Components/User/CompanyQA";
// import { AuthProvider } from "./Components/AuthContext";
// import UserMainLayout from "./Components/User/UserMainLayout";
// import AdminMaterials from "./Components/Admin/Pages/AdminMaterials";
// import CalendarBooking from "./Components/User/CalendarBooking";
// import AdminSlots from "./Components/Admin/Pages/AdminSlots";
// import Testimonials from "./Components/HomePage/Testimonials";
// import UserTestimonials from "./Components/User/UserTestimonials";
// import NewPasswordForm from "./Components/HomePage/NewPasswordForm";

// function App() {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/new-password" element={<NewPasswordForm />} />
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute allowedRole="admin">
//               <MainLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/admin" element={<AdminDashBoard />} />
//           <Route path="/admin/jobs" element={<AdminJobs />} />
//           <Route path="/admin/projects" element={<AdminProjects />} />
//           <Route path="/admin/companyqa" element={<AdminCompanyQa />} />
//           <Route path="/admin/materials" element={<AdminMaterials />} />
//           <Route path="/admin/slots" element={<AdminSlots />} />
//           {/* <Route path="/admin/user-projects" element={<UserProjectsPage />} /> */}
//         </Route>
//         <Route
//           path="/user"
//           element={
//             <ProtectedRoute allowedRole="user">
//               <UserMainLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/user" element={<Dashboard />} />
//           <Route path="/user/jobs" element={<Jobs />} />
//           <Route path="/user/projects" element={<ProjectHome />} />
//           <Route path="/user/company-qa" element={<CompanyQA />} />
//           <Route path="/user/calender" element={<CalendarBooking />} />
//           <Route path="/user/testimonials" element={<UserTestimonials />} />
//         </Route>
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;
import { Route, Routes } from "react-router-dom"; // remove BrowserRouter here
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
import AdminMaterials from "./Components/Admin/Pages/AdminMaterials";
import CalendarBooking from "./Components/User/CalendarBooking";
import AdminSlots from "./Components/Admin/Pages/AdminSlots";
import Testimonials from "./Components/HomePage/Testimonials";
import UserTestimonials from "./Components/User/UserTestimonials";
import NewPasswordForm from "./Components/HomePage/NewPasswordForm";

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
