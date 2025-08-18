import { Home } from "../pages/Home";

export const customerRoutes = [
  {
    path: "/home",
    component: Home,
    exact: true,
    protected: true,
    allowedRoles: "TeamLeader",
  },
];
