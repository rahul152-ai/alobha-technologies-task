// src/components/RoleGuard.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RoleGuard = ({ children, allowedRoles }) => {
  const { role } = useSelector((state) => state.auth);

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleGuard;
