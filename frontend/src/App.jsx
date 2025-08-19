import { Route, Routes } from "react-router-dom";
import "./assets/css/style.css";
import Layout from "./components/Layout";
import { commonRoutes } from "./routes/commonRoutes";
import { useSelector } from "react-redux";
import { customerRoutes } from "./routes/customerRoutes";
import AuthGuard from "./components/AuthGuard";
import RoleGuard from "./components/RoleGuard";

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  let routes = commonRoutes; // Start with common routes

  if (role === "TeamLeader") {
    routes = [...routes, ...customerRoutes]; // Add customer-specific routes
  }
  // else if (role === "serviceProvider") {
  //   routes = [...routes, ...serviceProviderRoutes]; // Add service provider-specific routes
  // }

  if (!isAuthenticated) {
    routes = [...routes];
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} />}>
          {routes.map((route, index) => {
            const Component = route.component;
            if (route.protected) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AuthGuard>
                      <RoleGuard allowedRoles={route.allowedRoles}>
                        <Component />
                      </RoleGuard>
                    </AuthGuard>
                  }
                />
              );
            }
            return (
              <Route key={index} path={route.path} element={<Component />} />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
