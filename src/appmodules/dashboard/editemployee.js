import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Editemployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const API = process.env.REACT_APP_BACKEND_API && "http://localhost:9800";

  /* ================= BASIC INFO ================= */
  const [employeeId, setEmployeeId] = useState("");
  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");

  /* ================= JOB INFO ================= */
  const [jobtype, setjobtype] = useState("");
  const [department, setdepartment] = useState("");
  const [salary, setsalary] = useState("");
  const [joiningDate, setjoiningDate] = useState("");
  const [status, setstatus] = useState("active");

  /* ================= ADDRESS ================= */
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [district, setdistrict] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [country, setcountry] = useState("");

  /* ================= LOAD EMPLOYEE ================= */
  useEffect(() => {
    if (!token) {
      alert("Session expired");
      navigate("/Login");
      return;
    }

    axios
      .get(`${API}/Employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status !== 250) {
          alert(res.data.message);
          return;
        }

        const emp = res.data.emp;

        setEmployeeId(emp.employeeId);
        setfullname(emp.fullname);
        setphone(emp.phone);
        setemail(emp.email);
        setgender(emp.gender);
        setdob(emp.dob);

        setjobtype(emp.jobtype);
        setdepartment(emp.department);
        setsalary(emp.salary);
        setjoiningDate(emp.joiningDate);
        setstatus(emp.status);

        setaddress(emp.address);
        setcity(emp.city);
        setdistrict(emp.district);
        setstate(emp.state);
        setpincode(emp.pincode);
        setcountry(emp.country);
      })
      .catch(() => alert("Failed to load employee"));
  }, [id, token, API, navigate]);

  /* ================= UPDATE ================= */
  const updateEmployee = () => {
    const data = { employeeId, fullname, phone, email, gender, dob, jobtype, department, salary, joiningDate, status, address, city, district, state, pincode, country, };

    axios
      .put(`${API}/Employeesupdate/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert(res.data.message);
        if (res.data.status === 250) {
          navigate("/Dashboard/Employeeslist");
        }
      })
      .catch(() => alert("Update failed"));
  };

  return (
    <Fragment>
      <div className="container-fluid bg-dark text-white min-vh-100 py-5">
        <div className="container">
          <div className="card edit-template shadow-lg border-0 ">
            <div className="card-header text-center text-light">
              <h3>Edit Employee</h3>
            </div>

            <div className="card-body text-light">
              <div className="row g-3">

                {/* BASIC INFO */}
                <h5 className="mt-3">👤 Basic Info</h5>

                <div className="col-md-4">
                  <label>Employee ID</label>
                  <input className="form-control" value={employeeId} disabled />
                </div>

                <div className="col-md-4">
                  <label>Full Name</label>
                  <input className="form-control" value={fullname} onChange={(e) => setfullname(e.target.value)} />
                </div>

                <div className="col-md-4">
                  <label>Phone</label>
                  <input className="form-control" value={phone} onChange={(e) => setphone(e.target.value)} />
                </div>

                <div className="col-md-4">
                  <label>Email</label>
                  <input className="form-control" value={email} onChange={(e) => setemail(e.target.value)} />
                </div>

                <div className="col-md-4">
                  <label>Gender</label>
                  <select className="form-select" value={gender} onChange={(e) => setgender(e.target.value)}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label>DOB</label>
                  <input type="date" className="form-control" value={dob} onChange={(e) => setdob(e.target.value)} />
                </div>

                {/* JOB INFO */}
                <h5 className="mt-4">💼 Job Info</h5>

                <div className="col-md-4">
                  <label>Job Type</label>
                  <input className="form-control" value={jobtype} onChange={(e) => setjobtype(e.target.value)} />
                </div>

                <div className="col-md-4">
                  <label>Department</label>
                  <input className="form-control" value={department} onChange={(e) => setdepartment(e.target.value)} />
                </div>

                <div className="col-md-4">
                  <label>Salary</label>
                  <input className="form-control" value={salary} onChange={(e) => setsalary(e.target.value)} />
                </div>

                <div className="col-md-4">
                  <label>Joining Date</label>
                  <input type="date" className="form-control" value={joiningDate} onChange={(e) => setjoiningDate(e.target.value)} />
                </div>

                <div className="col-md-4">
                  <label>Status</label>
                  <select className="form-select" value={status} onChange={(e) => setstatus(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* ADDRESS */}
                <h5 className="mt-4">🏠 Address</h5>

                <div className="col-md-6">
                  <label>Address</label>
                  <input className="form-control" value={address} onChange={(e) => setaddress(e.target.value)} />
                </div>

                <div className="col-md-3">
                  <label>Pincode</label>
                  <input className="form-control" value={pincode} onChange={(e) => setpincode(e.target.value)} />
                </div>

                <div className="col-md-3">
                  <label>City</label>
                  <input className="form-control" value={city} onChange={(e) => setcity(e.target.value)} />
                </div>

                <div className="col-md-4">
                  <label>District</label>
                  <input className="form-control" value={district} onChange={(e) => setdistrict(e.target.value)} />
                </div>

                <div className="col-md-4">
                  <label>State</label>
                  <input className="form-control" value={state} onChange={(e) => setstate(e.target.value)} />
                </div>

                <div className="col-md-4">
                  <label>Country</label>
                  <input className="form-control" value={country} onChange={(e) => setcountry(e.target.value)} />
                </div>

              </div>
            </div>

            <div className="card-footer text-center">
              <button className="btn btn-success px-5" onClick={updateEmployee}>
                Update Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Editemployee;
