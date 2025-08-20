import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import Team from "../pages/Team";
import AddTeam from "../pages/AddTeam";
import Users from "../pages/Users";
import AddUser from "../pages/AddUser";
import SystemLogs from "../pages/SystemLog";
import AllTodos from "../pages/AllTodo";
import EditTodo from "../pages/EditTodo";
import AddTodo from "../pages/AddTodo";

const authProtectedRoutes = [
  {
    path: "/",
    role: ["admin", "user"],
    component: <Home />,
  },
  {
    path: "/team",
    role: ["admin", "user"],
    component: <Team />,
  },
  {
    path: "/add-team",
    role: ["admin"],
    component: <AddTeam />,
  },
  {
    path: "/user",
    role: ["admin"],
    component: <Users />,
  },
  {
    path: "/add-user",
    role: ["admin"],
    component: <AddUser />,
  },
  {
    path: "/system-log",
    role: ["admin"],
    component: <SystemLogs />,
  },
  {
    path: "/todo",
    role: ["user"],
    component: <AllTodos />,
  },
  {
    path: "/add-todo",
    role: ["user"],
    component: <AddTodo />,
  },
  {
    path: "/edit-todo/:id",
    role: ["user"],
    component: <EditTodo />,
  },
];

const publicRoutes = [{ path: "/login", component: <Login /> }];

export { authProtectedRoutes, publicRoutes };
