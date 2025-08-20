//? This component is used to protect the login route from being accessed by an authenticated user. If the user is authenticated, the user will be redirected to the dashboard page. If the user is not authenticated, the user will be able to access the login page.

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginRouteGuard = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  if (isAuthenticated && token) {
    return <Navigate to="/" replace={true} />;
  } else {
    return children;
  }
};

export default LoginRouteGuard;
