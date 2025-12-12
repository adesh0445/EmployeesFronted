import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Addemployee() {
  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [jobtype, setjobtype] = useState("");
  const [salary, setsalary] = useState("");
  const [gender, setgender] = useState("");

  const navigate = useNavigate();

  const fullnameChange = (e) => setfullname(e.target.value);
  const phoneChange = (e) => setphone(e.target.value);
  const emailChange = (e) => setemail(e.target.value);
  const salaryChange = (e) => setsalary(e.target.value);
  const jobtypeChange = (e) => setjobtype(e.target.value);
  const genderChange = (e) => setgender(e.target.value);

  const postEmployee = () => {
    const token = localStorage.getItem("token");
    const employeedata = { fullname, phone, email, jobtype, salary, gender };

    axios
      .post("http://localhost:9800/Addemployee", employeedata, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status === 450) alert(res.data.message);
        else if (res.data.status === 451) alert(res.data.message);
        else if (res.data.status === 250) {
          alert(res.data.message);
          navigate("/Dashboard/Employeeslist");
        }
      });
  };

  return (
    <Fragment>
      <div className="Addemployee">
        <h1 className="col-md-12 text-center mb-4">Add Employee</h1>
        <div className="row justify-content-center">
          <div className="col-md-10 fullinputs">
            <ul className="AddEmpAllInputs">

              <li className="AddEmpInputRow">
                <span className="AddEmpLabel">Full Name</span>
                <input
                  type="text"
                  value={fullname}
                  onChange={fullnameChange}
                  placeholder="Full Name"
                  className="AddEmpInput"
                />
              </li>

              <li className="AddEmpInputRow">
                <span className="AddEmpLabel">Phone</span>
                <input
                  type="text"
                  value={phone}
                  onChange={phoneChange}
                  placeholder="Phone"
                  className="AddEmpInput"
                />
              </li>

              <li className="AddEmpInputRow">
                <span className="AddEmpLabel">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={emailChange}
                  placeholder="Email"
                  className="AddEmpInput"
                />
              </li>

              <li className="AddEmpInputRow">
                <span className="AddEmpLabel">Gender</span>
                <select
                  value={gender}
                  onChange={genderChange}
                  className="AddEmpInput"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </li>

              <li className="AddEmpInputRow">
                <span className="AddEmpLabel">Job Type</span>
                <input
                  type="text"
                  value={jobtype}
                  onChange={jobtypeChange}
                  placeholder="Job Type"
                  className="AddEmpInput"
                />
              </li>

              <li className="AddEmpInputRow">
                <span className="AddEmpLabel">Salary</span>
                <input
                  type="text"
                  value={salary}
                  onChange={salaryChange}
                  placeholder="Salary"
                  className="AddEmpInput"
                />
              </li>

              <li className="AddEmpInputRow justify-content-center">
                <button className="btn btn-success postEmpBtn" onClick={postEmployee}>
                  Add Employee
                </button>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Addemployee;
