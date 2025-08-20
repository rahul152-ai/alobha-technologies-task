import { NavLink } from "react-router-dom";
import { House, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authSlice";
import menuConfig from "../menuConfig";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  function handleLogout() {
    localStorage.clear("token");
    dispatch(logout());
  }

  return (
    <div style={{ height: "100%", backgroundColor: "#fff" }}>
      <nav>
        <ul
          className="d-flex flex-column gap-3 mt-1 p-0"
          style={{ listStyleType: "none" }}
        >
          {(menuConfig || [])
            .filter((item) => item.role.includes(role))
            .map((item) => (
              <li key={item.url}>
                <NavLink
                  to={item.url}
                  className="text-14-500 py-12 px-3 text-decoration-none d-flex gap-3 align-items-center"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          <li>
            <div
              role="button"
              className="text-14-500 py-12 px-3 text-decoration-none d-flex gap-3 align-items-center"
              onClick={handleLogout}
            >
              <LogOut className="sidebar-icon" size={16} strokeWidth={1} />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
