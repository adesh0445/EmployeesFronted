import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeDetails() {
  const [employee, setEmployee] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const API = process.env.REACT_APP_BACKEND_API && "http://localhost:9800";

  useEffect(() => {
    if (!token) {
      navigate("/EmployeeLogin");
      return;
    }

    axios
      .get(`${API}/employeeProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 250) {
          setEmployee(res.data.employee);
        }
      })
      .catch(() => {
        navigate("/EmployeeLogin");
      });
  }, []);

  if (!employee) {
    return <h3 className="text-center mt-5">Loading Profile...</h3>;
  }

  return (
    <Fragment>
      <div className="container mt-4">

        <h2 className="text-center mb-3">My Profile</h2>

        <div className="card p-3 mb-3 text-center">
          <h4>{employee.fullname}</h4>
          <p>{employee.jobtype}</p>
        </div>

        <div className="card p-3 mb-3">
          <h5>👤 Basic Info</h5>
          <p><b>Employee ID:</b> {employee.employeeId}</p>
          <p><b>Phone:</b> {employee.phone}</p>
          <p><b>Email:</b> {employee.email}</p>
          <p><b>Gender:</b> {employee.gender}</p>
          <p><b>DOB:</b> {employee.dob}</p>
        </div>

        <div className="card p-3 mb-3">
          <h5>💼 Job Info</h5>
          <p><b>Department:</b> {employee.department}</p>
          <p><b>Salary:</b> {employee.salary}</p>
          <p><b>Joining Date:</b> {employee.joiningDate}</p>
          <p><b>Status:</b> {employee.status}</p>
        </div>

        <div className="card p-3 mb-3">
          <h5>🏠 Address</h5>
          <p>{employee.address}</p>
          <p>{employee.city}, {employee.district}</p>
          <p>{employee.state} - {employee.pincode}</p>
          <p>{employee.country}</p>
        </div>

        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>

      </div>
    </Fragment>
  );
}

export default EmployeeDetails;
