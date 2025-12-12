import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="sidebar-container always-open">
        <div className="text-white fw-bold p-3">Sidebar</div>

        <ul className="list-unstyled ps-3 sideli">
          <li><Link className="text-white sidelink" to="Employeeslist"><h5>Employees</h5></Link></li>
          <li><Link className="text-white sidelink" to="Addemployee"><h5>Add Employee</h5></Link></li>
          <li><Link className="text-white sidelink" to="Recharts"><h5>Chart</h5></Link></li>
          <li><Link className="text-white sidelink" to="/"><h5>Home</h5></Link></li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
