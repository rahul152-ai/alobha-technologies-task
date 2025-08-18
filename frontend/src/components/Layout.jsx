// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { AuthHeader } from "./AuthHeader";
import { NonAuthHeader } from "./NonAuthHeader";
import Sidebar from "./Sidebar"; // Assuming you have a Sidebar component

const Layout = ({ isAuthenticated }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <header
        style={{
          position: "relative",
          height: isAuthenticated ? "74px " : "",
          display: "flex",
          backgroundColor: "#fff",
        }}
      >
        {isAuthenticated ? <AuthHeader /> : null}
      </header>

      <div
        style={{
          display: isAuthenticated ? "flex" : "block",
          flex: 1,
          background: "#F7F7F7",
        }}
      >
        {isAuthenticated && (
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
