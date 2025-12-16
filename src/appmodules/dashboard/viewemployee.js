import React, { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { EmployeesContext } from "./context";
function Viewemployee() {

  const { id } = useParams();
  const { employees } = useContext(EmployeesContext);

  const emp = employees.find(e => e._id === id);

  if (!emp) {
    return <h3 style={{ color: "#fff" }}>Employee Not Found</h3>;
  }

  return (
    <Fragment>
      <div className="ViewEmployee">

        <div className="ViewEmpHeader"> <img src={emp.photo} alt="Employee" className="ViewEmpPhoto" />
          <h2>{emp.fullname}</h2>
          <p>{emp.jobtype}</p>
        </div>

        <div className="ViewEmpBody">

          <div className="ViewSection">
            <h4>👤 Basic Info</h4>
            <p><b>Phone:</b> {emp.phone}</p>
            <p><b>Email:</b> {emp.email}</p>
            <p><b>Gender:</b> {emp.gender}</p>
            <p><b>DOB:</b> {emp.dob}</p>
          </div>

          <div className="ViewSection">
            <h4>💼 Job Info</h4>
            <p><b>Department:</b> {emp.department}</p>
            <p><b>Salary:</b> {emp.salary} Rs</p>
            <p><b>Joining:</b> {emp.joiningDate}</p>
            <p><b>Status:</b> {emp.status}</p>
          </div>

          <div className="ViewSection">
            <h4>🏠 Address</h4>
            <p>{emp.address}</p>
            <p>{emp.city}, {emp.district}</p>
            <p>{emp.state} - {emp.pincode}</p>
            <p>{emp.country}</p>
          </div>

        </div>
      </div>
    </Fragment>
  );
}

export default Viewemployee;