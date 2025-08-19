// src/components/Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthHeader } from "./AuthHeader";
import { NonAuthHeader } from "./NonAuthHeader";
import Sidebar from "./Sidebar"; // Assuming you have a Sidebar component

const Layout = ({ isAuthenticated }) => {
  const location = useLocation();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <header
        style={{
          position: "relative",
          height:
            location.pathname !== "/login" && isAuthenticated ? "74px " : "",
          display: "flex",
          backgroundColor: "#fff",
        }}
      >
        {location.pathname !== "/login" && isAuthenticated ? (
          <AuthHeader />
        ) : null}
      </header>

      <div
        style={{
          display: isAuthenticated ? "flex" : "block",
          flex: 1,
          background: "#F7F7F7",
        }}
      >
        {location.pathname !== "/login" && isAuthenticated && (
          <aside
            style={{
              width: "250px",
              padding: "20px",
              color: "#fff",
            }}
            className="sidebar-parent-container"
          >
            <Sidebar />
          </aside>
        )}

        {/* Main Content */}
        <main className={isAuthenticated ? "main-content container" : ""}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
