import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
function EmployeeDashboard() {
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate()
  const API = process.env.REACT_APP_BACKEND_API && "http://localhost:9800";
  const token = localStorage.getItem("token");

  // ===== CHECK IN =====
  const handleCheckIn = () => {
    axios.post( `${API}/employeeCheckIn`, {}, { headers: { Authorization: `Bearer ${token}` } } ).then((res) => {
      window.confirm(res.data.message);
      fetchAttendance();
    }).catch(() => {
      toast.error("Check In Error");
    });
  };

  // ===== CHECK OUT =====
  const handleCheckOut = () => {
    axios.post(
      `${API}/employeeCheckOut`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    ).then((res) => {
      window.confirm(res.data.message);
      fetchAttendance();
    }).catch(() => {
      toast.error("Check Out Error");
    });
  };

  // ===== FETCH ATTENDANCE =====
  const fetchAttendance = () => {
    axios.get(`${API}/employeeAllAttendance`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setAttendance(res.data.attendance || []);
    });
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const LogOutNow=()=>{
        window.confirm("Are You Sure Log Out Now",)
    localStorage.removeItem("token")
    navigate("/EmployeeLogin")

  }
  const myProfile=()=>{
    navigate("/employeeProfile")
  }
  
  const Present = attendance.filter(attend =>attend.status==="Present") 

  return (
    <Fragment>
    <div className="EmployeeDashboard text-center">
      <ToastContainer />
      <h2>Employee Dashboard</h2>
      <div className="col-md-12 col-sm-12 mt-5">
      <button className="col-md-3 col-sm-6 btn btn-success me-2 p-4" onClick={handleCheckIn}>
        Check In
      </button>
      <button className="col-md-3 col-sm-6 btn btn-danger me-2 p-4" onClick={handleCheckOut}>
        Check Out
      </button>
      <button className="col-md-3 col-sm-6 btn btn-primary me-2 p-4" onClick={myProfile}>
       <FaUser></FaUser> My Profile
      </button>
      </div>

      <hr />
      <div className="col-md-12 row">
      <div className="col-md-3 bg-primary card p-4 text-light">
        <h4>Total Attendance:{attendance.length}</h4>
      </div>

      <div className="col-md-3 bg-warning card p-4 text-dark">
        <h4>Present Attendance:{Present.length}</h4>
      </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a) => (
            <tr key={a._id}>
              <td>{a.date}</td>
              <td>{a.checkIn || "-"}</td>
              <td>{a.checkOut || "-"}</td>
              <td>{a.status}</td>
            </tr> 
          ))}
        </tbody>
      </table>
      <div className="col-md-12">
       <button className="btn btn-danger m-1 col-md-3" onClick={LogOutNow} >Log Out Now</button>
       <button className="btn btn-success m-1 col-md-3"><Link to="/EmployeeLogin" className="text-light text-decoration-none">Re-Login</Link></button>

      </div>
    </div>

    </Fragment>
  );
}

export default EmployeeDashboard;
