import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      {/* TOGGLER BUTTON for mobile */}
      <button
        className="btn btn-dark d-md-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-expanded="false"
        aria-controls="sidebarMenu"
      >
        ☰ Menu
      </button>

      {/* SIDEBAR */}
      <div className="collapse d-md-block" id="sidebarMenu">
        <div className="text-white p-3">
          <ul className="list-unstyled sideli">
            <li>
              <Link className="text-white sidelink nav-text" to="/">
                <h5>Home</h5>
              </Link>
            </li>
            <li>
              <Link className="text-white sidelink nav-text" to="Employeeslist">
                <h5>Employees</h5>
              </Link>
            </li>
            <li>
              <Link className="text-white sidelink nav-text" to="Addemployee">
                <h5>Add Employee</h5>
              </Link>
            </li>
            <li>
              <Link className="text-white sidelink nav-text" to="Recharts">
                <h5>Chart</h5>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
