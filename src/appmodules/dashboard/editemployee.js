import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Editemployee() {

  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");   // ⭐ JWT Token

  // ⭐ LOAD OLD EMP DATA
  useEffect(() => {
    axios.get(`http://localhost:9800/Employees/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        const emp = res.data.emp;
        setfullname(emp.fullname);
        setphone(emp.phone);
        setemail(emp.email);
      })
      .catch(() => {
        alert("Employee Not Found");
      });
  }, [id, token]);

  // ⭐ SAVE EDITED DATA
  const Edit = () => {
    const EmployeeData = { fullname, phone, email };

    axios.put(`http://localhost:9800/Employeesupdate/${id}`, EmployeeData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        alert(res.data.message);
        if (res.data.status === 250) {
          navigate("/Dashboard/Employeeslist");
        }
      });
  };

  return (
    <Fragment>

      <div className="Addemployee">
        <h1 className="col-md-12 text-center">Edit Employee</h1>

        <div className="row text-center">
          <div className='col-md-12 fullinputs'>
            <div className='AddEmpAllInputs'>

              <li className='AddEmpInputName'><h3>Full Name</h3></li>
              <li><input type='text' value={fullname} onChange={(e)=>setfullname(e.target.value)} /></li>

              <li className='AddEmpInputName'><h3>Phone</h3></li>
              <li><input type='phone' value={phone} onChange={(e)=>setphone(e.target.value)} /></li>

              <li className='AddEmpInputName'><h3>Email</h3></li>
              <li><input type='email' value={email} onChange={(e)=>setemail(e.target.value)} /></li>

              <button className='btn btn-success postEmpBtn' onClick={Edit}>
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
