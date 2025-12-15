import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Editemployee() {
  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");

  const API = process.env.REACT_APP_BACKEND_API || "http://localhost:9800";

  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🚀 LOAD OLD EMPLOYEE DATA
  useEffect(() => {
    if (!token) {
      alert("Login expired, please login again");
      navigate("/Login");
      return;
    }

    axios
      .get(`${API}/Employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status !== 250) {
          alert(res.data.message);
          return;
        }

        const emp = res.data.emp;
        setfullname(emp.fullname);
        setphone(emp.phone);
        setemail(emp.email);
      })
      .catch((err) => {
        console.error("LOAD ERROR:", err.response || err);
        alert("Failed to load employee");
      });
  }, [id, token, API, navigate]);

  // 💾 UPDATE EMPLOYEE
  const Edit = () => {
    const EmployeeData = { fullname, phone, email };

    axios
      .put(`${API}/Employeesupdate/${id}`, EmployeeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert(res.data.message);
        if (res.data.status === 250) {
          navigate("/Dashboard/Employeeslist");
        }
      })
      .catch((err) => {
        console.error("UPDATE ERROR:", err.response || err);
        alert("Employee update failed");
      });
  };

  return (
    <Fragment>
      <div className="Addemployee">
        <h1 className="col-md-12 text-center">Edit Employee</h1>

        <div className="row text-center">
          <div className="col-md-12 fullinputs">
            <div className="AddEmpAllInputs">
              <li className="AddEmpInputName">
                <h3>Full Name</h3>
              </li>
              <li>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setfullname(e.target.value)}
                />
              </li>

              <li className="AddEmpInputName">
                <h3>Phone</h3>
              </li>
              <li>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </li>

              <li className="AddEmpInputName">
                <h3>Email</h3>
              </li>
              <li>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </li>

              <button className="btn btn-success postEmpBtn" onClick={Edit}>
                Edit Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Editemployee;
