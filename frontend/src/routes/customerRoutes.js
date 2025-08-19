import { Home } from "../pages/Home";
import { MyTask } from "../pages/MyTask";

export const customerRoutes = [
  {
    path: "/home",
    component: Home,
    exact: true,
    protected: true,
    allowedRoles: "TeamLeader",
  },
  {
    path: "/my-task",
    component: MyTask,
    exact: true,
    protected: true,
    allowedRoles: "TeamLeader",
  },
];
