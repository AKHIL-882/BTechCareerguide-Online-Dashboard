// Mapping of route paths to breadcrumb names
export const breadcrumbMap = {
  dashboard: "Dashboard",
  jobs: "Jobs",
  projects: "Projects",
  calendar: "Test Assistance", // custom
  profile: "My Profile",
  settings: "Settings",
};

// utils/breadcrumbIcons.js
import {
  LayoutDashboard,
  Briefcase,
  GitCompareArrows,
  SquareDashedBottomCode,
  User,
  Settings,
} from "lucide-react";

export const breadcrumbIcons = {
  dashboard: LayoutDashboard,
  jobs: Briefcase,
  projects: GitCompareArrows,
  calendar: SquareDashedBottomCode,
  profile: User,
  settings: Settings,
};
