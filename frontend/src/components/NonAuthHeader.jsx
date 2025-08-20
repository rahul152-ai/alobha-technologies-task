import React from "react";
import dclutterlogo from "../assets/images/alohaFavIcon.webp";
import { useNavigate } from "react-router-dom";

export const NonAuthHeader = () => {
  const navigate = useNavigate();
  return (
    <nav
      className="navbar navbar-expand-lg navbar-white bg-white"
      style={{
        width: "100vw",
        position: "fixed",
        zIndex: "1000",
      }}
    >
      <div className="d-flex align-items-center justify-content-between w-100 px-5">
        <img
          src={dclutterlogo}
          alt="logo"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="d-flex gap-5">
          <div
            className="text-14-600 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Home
          </div>
          <div
            className="text-14-600 cursor-pointer"
            onClick={() => navigate("/about-us")}
          >
            About Us
          </div>
          <div className="text-14-600 cursor-pointer">Contact Us</div>
        </div>
        <div
          className="text-16-400 border-grey px-3 py-1"
          style={{
            cursor: "pointer",
            color: "#1f4097",
            borderRadius: "5px",
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </div>
      </div>
    </nav>
  );
};
