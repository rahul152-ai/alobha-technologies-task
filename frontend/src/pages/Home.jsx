import React from "react";
import teamtaskhome from "../assets/images/teamtaskhome.jpg";
import solotaskhome from "../assets/images/solotaskhome.webp";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div>
        <div className="text-30-600">
          Good Morning,{" "}
          <span
            style={{
              color: "#1f4097",
            }}
          >
            John !
          </span>
        </div>
        <div className="d-flex align-items-center gap-1 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.0009 13.43C13.724 13.43 15.1209 12.0331 15.1209 10.31C15.1209 8.58687 13.724 7.19 12.0009 7.19C10.2777 7.19 8.88086 8.58687 8.88086 10.31C8.88086 12.0331 10.2777 13.43 12.0009 13.43Z"
              stroke="#1f4097"
              stroke-width="1.5"
            />
            <path
              d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z"
              stroke="#1f4097"
              stroke-width="1.5"
            />
          </svg>
          <span
            className="text-16-400"
            style={{
              color: "#8B8B8B",
            }}
          >
            4140 Parker Rd. Allentown, New Mexico 31134
          </span>
        </div>
      </div>
      <Row className="mt-5 gap-5 flex-nowrap justify-content-center">
        <div
          className="col-md-5 white-home-container"
          onClick={() => navigate("/home/add-junk-removal-request")}
        >
          <div className="text-25-600">All Compamy Tasks</div>
          <div
            className="text-16-400 col-8"
            style={{
              color: "#8B8B8B",
            }}
          >
            Click to see all company tasks
          </div>
          <img
            src={teamtaskhome}
            className="float-end w-100"
            alt="junkremovalfront"
          />
        </div>
        <div
          className="col-md-5 white-home-container"
          onClick={() => navigate("/home/skip-hire")}
        >
          <div className="text-25-600">My Tasks</div>
          <div
            className="text-16-400 col-8"
            style={{
              color: "#8B8B8B",
            }}
          >
            Click to see your tasks and manage them
          </div>
          <img
            src={solotaskhome}
            className="float-end w-100"
            alt="yellowcontainer"
          />
        </div>
      </Row>
    </section>
  );
};
