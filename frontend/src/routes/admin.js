import { Home } from "../pages/Home";
import { MyTask } from "../pages/MyTask";

export const adminRoutes = [
  {
    path: "/home",
    component: Home,
    exact: true,
    protected: true,
    allowedRoles: "admin",
  },
  {
    path: "/my-task",
    component: MyTask,
    exact: true,
    protected: true,
    allowedRoles: "admin",
  },
];
