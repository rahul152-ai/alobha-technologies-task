import noProfileImage from "../assets/svg/noProfileImage.svg";
import dclutterlogo from "../assets/images/alohaFavIcon.webp";
import { useSelector } from "react-redux";

export const AuthHeader = () => {
  const { role, user } = useSelector((state) => state.auth);
  return (
    <nav
      className="d-flex align-items-center col-12"
      style={{
        border: " 1px solid #E5E7EB",
        background: " #FFF",
      }}
    >
      <div className="w-100 d-flex align-items-center justify-content-between gap-4">
        <div className="d-flex justify-content-center align-items-center ms-5">
          <img src={dclutterlogo} height={52} width={52} alt="D Clutter Logo" />
        </div>
        <div className="d-flex align-items-center gap-2 col-2">
          <img src={noProfileImage} alt="noProfileImage" />
          <div>
            <div className="text-14-600">{user?.name}</div>
            <div className="text-12-600">{role}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};
