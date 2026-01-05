import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function EmployeeLogin() {
  const [employeeId,setEmployeeId]=useState("")
  const [employeePass,setEmployeePass]=useState("")
  
const API = process.env.REACT_APP_BACKEND_API && "http://localhost:9800";


  const navigate = useNavigate();
  const idChange=(e)=>{
    setEmployeeId(e.target.value);
  }
  const passChange=(e)=>{
    setEmployeePass(e.target.value);
  }
  const handleLogin = ()=>{
      const userData = {employeeId,employeePass}
      axios.post(`${API}/EmployeeLogin`,userData).then((res)=>{
          if(res.data.status===450){
            alert(res.data.message)
          }
          if(res.data.status===451){
            alert(res.data.message)
          }
          if(res.data.status===251){
          toast.success(res.data.message, { position: "top-right", autoClose: 2500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
            localStorage.setItem("token",res.data.token)

            setTimeout(() => {
              navigate("/EmployeeDashboard")
            }, 2000);
          }
      })
      }
      const ForgotPassById = ()=>{
        navigate("/FindEmpForgot")
      }
  return (
    <Fragment>
      <div className="container-fluid Loginpage">
        <h1 className="col-md-12 text-center">Employees Loginpage</h1>
        <div className="row text-center">
          <ToastContainer/>
      <div className='col-md-12 fullinputs'>
            <div className='logininputs'>
          <li className='logininputname'><h3>Employee Id</h3></li>
          <li><input type='text' value={employeeId} onChange={idChange} className='logininput' placeholder='Username'/></li>

          <li className='logininputname'><h3>Employee Password</h3></li>
          <li><input type='password' value={employeePass} onChange={passChange} className='logininput' placeholder='Password'/></li>
          <div className="col-md-12 text-center">
          <button onClick={handleLogin} className='col-4 m-2 btn btn-success'>Login</button>
          <button onClick={ForgotPassById} className='col-4 btn m-2 btn-primary'>Forgot Password</button>
          </div>
         
            </div>
            </div>

        </div>
      </div>
    </Fragment>
  );
}

export default EmployeeLogin;
