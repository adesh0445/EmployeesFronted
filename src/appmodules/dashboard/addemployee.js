import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Addemployee() {

  /* ================= BASIC INFO ================= */
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

  /* ================= ADDRESS INFO ================= */
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [district, setdistrict] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [country, setcountry] = useState("India");

  /* ================= PROFILE ================= */
  // const [photo, setphoto] = useState(null);

  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const API = process.env.REACT_APP_BACKEND_API || "http://localhost:9800";

  /* ================= PINCODE AUTO ================= */
  const pincodeChange = async (e) => {
    const pin = e.target.value;
    setpincode(pin);

    if (pin.length === 6) {
     
        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${pin}`
        );
        if (res.data[0].Status === "Success") {
          const p = res.data[0].PostOffice[0];
          setcity(p.Block || "");
          setdistrict(p.District || "");
          setstate(p.State || "");
        }
    }
  };

  /* ================= POST EMPLOYEE ================= */
 const postEmployee = () => {
  const token = localStorage.getItem("token");
  setloading(true);

  const employeedata = { fullname, phone, email, gender, dob, jobtype, department, salary, joiningDate, status, address, city, state, pincode, country };

  axios.post(`${API}/Addemployee`, employeedata, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((res) => {
    setloading(false);

    if (res.data.status === 450 || res.data.status === 451) {
      toast.error(res.data.message, { autoClose: 1500 });
    }

    if (res.data.status === 250) {
      toast.success(res.data.message, { autoClose: 2000 });
      setTimeout(() => {
        navigate("/Dashboard/Employeeslist");
      }, 2000);
    }
  })
  .catch(() => {
    setloading(false);
    toast.error("Server Error");
  });
};


  /* ================= JSX ================= */
  return (
    <Fragment>
      <ToastContainer />

      <div className="Addemployee">
        <h1 className="text-center mb-4">Add Employee</h1>

        <ul className="AddEmpAllInputs">

          {/* ===== BASIC INFO ===== */}
          <div className="AddEmpSectionTitle">👤 Basic Info</div>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Full Name</span>
            <input value={fullname} onChange={(e)=>setfullname(e.target.value)} />
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Phone</span>
            <input value={phone} onChange={(e)=>setphone(e.target.value)} />
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Email</span>
            <input value={email} onChange={(e)=>setemail(e.target.value)} />
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Gender</span>
            <select value={gender} onChange={(e)=>setgender(e.target.value)}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">DOB</span>
            <input type="date" value={dob} onChange={(e)=>setdob(e.target.value)} />
          </li>

          {/* ===== JOB INFO ===== */}
          <div className="AddEmpSectionTitle">💼 Job Info</div>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Job Type</span>
            <input value={jobtype} onChange={(e)=>setjobtype(e.target.value)} />
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Department</span>
            <input value={department} onChange={(e)=>setdepartment(e.target.value)} />
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Salary</span>
            <input value={salary} onChange={(e)=>setsalary(e.target.value)} />
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Joining Date</span>
            <input type="date" value={joiningDate} onChange={(e)=>setjoiningDate(e.target.value)} />
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Status</span>
            <select value={status} onChange={(e)=>setstatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </li>

          {/* ===== ADDRESS ===== */}
          <div className="AddEmpSectionTitle">🏠 Address</div>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Address</span>
            <input value={address} onChange={(e)=>setaddress(e.target.value)} />
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Pincode</span>
            <input value={pincode} onChange={pincodeChange} />
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">City</span>
            <input value={city} onChange={(e)=>setcity(e.target.value)} />
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">District</span>
            <input value={district} onChange={(e)=>setdistrict(e.target.value)} />
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">State</span>
            <input value={state} onChange={(e)=>setstate(e.target.value)} />
          </li>

          <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Country</span>
            <input value={country} onChange={(e)=>setcountry(e.target.value)} />
          </li>

          {/* ===== PHOTO ===== */}
          <div className="AddEmpSectionTitle">🖼 Profile Photo</div>

          {/* <li className="AddEmpInputRow">
            <span className="AddEmpLabel">Photo</span>
            <input type="file" onChange={(e)=>setphoto(e.target.files[0])} />
          </li> */}

          <li className="AddEmpInputRow justify-content-center">
            <button
              className="btn btn-success postEmpBtn"
              onClick={postEmployee}
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Employee"}
            </button>
          </li>

        </ul>
      </div>
    </Fragment>
  );
}

export default Addemployee;