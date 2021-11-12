import Application from "./views/Application";
import Applicant from "./views/Applicant";
import Dashboard from "./views/Dashboard";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
  },
  {
    path: "/applicant",
    name: "Pending Application",
    icon: "pe-7s-news-paper",
    component: Applicant,
  },
  {
    path: "/application",
    name: "All Application",
    icon: "pe-7s-id",
    component: Application,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "pe-7s-users",
  },
];

export default dashboardRoutes;
