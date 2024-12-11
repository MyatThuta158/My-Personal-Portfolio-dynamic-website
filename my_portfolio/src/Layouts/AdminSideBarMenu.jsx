import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AdminSideBarMenu() {
  const navigate = useNavigate();
  return (
    <div className="d-flex h-100" style={{ height: "200vh" }}>
      <div
        className="bg-dark text-white h-100"
        style={{ height: "100vh", width: "20vw" }}
      >
        <div className="p-3" style={{ height: "100vh" }}>
          <h3 className="text-center pb-3 border-bottom border-light">
            Admin Panel
          </h3>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-white"
                onClick={() => navigate("/LandingInfo")}
              >
                <i className="bi bi-speedometer2"></i> Landing Info
              </button>
            </li>

            {/* <li className="nav-item">
              <a href="#users" className="nav-link text-white">
                <i className="bi bi-people"></i> Projects
              </a>
            </li> */}

            <li>
              <button
                className="nav-link text-white"
                onClick={() => navigate("/Projects")}
              >
                <i className="bi bi-people"></i> Projects
              </button>
            </li>

            <li className="nav-item">
              <a href="#logout" className="nav-link text-white">
                <i className="bi bi-box-arrow-right"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-100">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminSideBarMenu;
