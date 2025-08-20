import {
  Home,
  ListChecks,
  ListFilterPlus,
  Logs,
  UserRound,
  Users,
} from "lucide-react";

const menuConfig = [
  {
    url: "/",
    label: "Home",
    icon: <Home className="sidebar-icon" size={16} />,
    role: ["admin", "user"],
  },
  {
    url: "/team",
    label: "Team",
    icon: <Users className="sidebar-icon" size={16} />,
    role: ["admin", "user"],
  },
  {
    url: "/user",
    label: "User",
    icon: <UserRound className="sidebar-icon" size={16} />,
    role: ["admin"],
  },
  {
    url: "/system-log",
    label: "System Log",
    icon: <Logs className="sidebar-icon" size={16} />,
    role: ["admin"],
  },
  {
    url: "/todo",
    label: "All Todos",
    icon: <ListChecks className="sidebar-icon" size={16} />,
    role: ["user"],
  },
  {
    url: "/add-todo",
    label: "Add Todo",
    icon: <ListFilterPlus className="sidebar-icon" size={16} />,
    role: ["user"],
  },
];

export default menuConfig;
