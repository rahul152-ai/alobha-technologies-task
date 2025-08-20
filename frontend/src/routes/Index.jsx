import React from "react";
import { Routes, Route } from "react-router-dom";

import { authProtectedRoutes, publicRoutes } from "./routes";
import LoginRouteGuard from "../components/auth/LoginRouteGaurd";
import ProtectedRoutes from "../components/auth/ProtectedRoutes";
import { Login } from "../pages/Login";

const Index = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<LoginRouteGuard>{route.component}</LoginRouteGuard>}
            key={idx}
            exact={true}
          />
        ))}
      </Route>
      <Route>
        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <ProtectedRoutes allowedRole={route.role}>
                {route.component}
              </ProtectedRoutes>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default Index;
