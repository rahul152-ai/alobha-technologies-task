import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BriefcaseBusiness,
  CircleDollarSign,
  House,
  Users,
  UserRound,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Sidebar = () => {
  const [isQuotesOpen, setIsQuotesOpen] = useState(false);
  const [isJobsOpen, setIsJobsOpen] = useState(false);

  const toggleQuotesDropdown = () => {
    setIsQuotesOpen(!isQuotesOpen);
  };

  const toggleJobsDropdown = () => {
    setIsJobsOpen(!isJobsOpen);
  };

  return (
    <div style={{ height: "100%", backgroundColor: "#fff" }}>
      <nav>
        <ul
          className="d-flex flex-column gap-3 mt-1 p-0"
          style={{ listStyleType: "none" }}
        >
          <li>
            <NavLink
              to="/home"
              className="text-14-500 py-12 px-3 text-decoration-none d-flex gap-3 align-items-center"
              activeClassName="active" // Adds an active-sidebar-item class for Home NavLink
            >
              <House className="sidebar-icon" size={16} strokeWidth={1} />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <div
              className="text-14-500 py-12 px-3 text-decoration-none d-flex gap-3 align-items-center justify-content-between"
              style={{ cursor: "pointer" }}
              onClick={toggleJobsDropdown}
            >
              <div className="d-flex gap-3 align-items-center">
                <BriefcaseBusiness
                  className="sidebar-icon"
                  size={16}
                  strokeWidth={1}
                />
                <span>Tasks</span>
              </div>
              {isJobsOpen ? (
                <ChevronUp className="sidebar-icon" size={16} />
              ) : (
                <ChevronDown className="sidebar-icon" size={16} />
              )}
            </div>
            {isJobsOpen && (
              <ul style={{ listStyleType: "none", paddingLeft: "20px" }}>
                <li>
                  <NavLink
                    to="/junk-removal"
                    className="text-14-400 mt-2 py-2 px-3 text-decoration-none d-flex gap-3 align-items-center"
                    activeClassName="active"
                  >
                    <span className="text-14-500">My Team Task</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-task"
                    activeClassName="active"
                    className="text-14-400 py-2 mt-2 px-3 text-decoration-none d-flex gap-3 align-items-center"
                  >
                    <span className="text-14-500">My Tasks</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink
              to="/about-us"
              className="text-14-500 py-12 px-3 text-decoration-none d-flex gap-3 align-items-center"
              activeClassName="active"
            >
              <Users className="sidebar-icon" size={16} strokeWidth={1} />
              <span>Teams</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className="text-14-500 py-12 px-3 text-decoration-none d-flex gap-3 align-items-center"
              activeClassName="active"
            >
              <UserRound className="sidebar-icon" size={16} strokeWidth={1} />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
