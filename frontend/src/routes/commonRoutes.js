import { Login } from "../pages/Login";

export const commonRoutes = [
  {
    path: "/login",
    component: Login,
    exact: true,
    protected: false,
  },
];
