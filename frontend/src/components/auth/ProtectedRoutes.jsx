import { Navigate } from "react-router-dom";
import Layout from "../Layout";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children, allowedRole }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  // Check if user is logged in
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace={true} />;
  }

  // Check if the logged-in user has the allowed role
  const isAllowed = allowedRole?.includes(role);
  if (!isAllowed) {
    return <Navigate to={`/unauthorized`} />;
  }

  // If logged in and authorized, render the children with layout
  return <Layout isAuthenticated={isAuthenticated}>{children}</Layout>;
};

export default ProtectedRoutes;
