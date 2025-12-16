import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Loginpage() {
  const [username,setusername]=useState("")
  const [password,setpassword]=useState("")
const API = process.env.REACT_APP_BACKEND_API || "http://localhost:9800";


  const navigate = useNavigate();
  const userchange=(e)=>{
    setusername(e.target.value);
  }
  const passchange=(e)=>{
    setpassword(e.target.value);
  }
  const handleLogin = ()=>{
      const userData = {username,password}
      axios.post(`${API}/Loginpage`,userData).then((res)=>{
          if(res.data.status===450){
            alert(res.data.message)
          }
          if(res.data.status===451){
            alert(res.data.message)
          }
          if(res.data.status===250){
          toast.success(res.data.message, { position: "top-right", autoClose: 2500, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "dark", });
            localStorage.setItem("token",res.data.token)

            setTimeout(() => {
              navigate("/Dashboard")
            }, 2000);
          }
      })
      }
  return (
    <Fragment>
      <div className="container-fluid Loginpage">
        <h1 className="col-md-12 text-center">Loginpage</h1>
        <div className="row text-center">
          <ToastContainer/>
      <div className='col-md-12 fullinputs'>
            <div className='logininputs'>
          <li className='logininputname'><h3>Username</h3></li>
          <li><input type='text' value={username} onChange={userchange} className='logininput' placeholder='Username'/></li>

          <li className='logininputname'><h3>Password</h3></li>
          <li><input type='password' value={password} onChange={passchange} className='logininput' placeholder='Password'/></li>
          <button onClick={handleLogin} className='btn btn-success'>Login</button>
          <Link to="/Register" className="text-center text-light d-block">
            Register
          </Link>
            </div>
            </div>

        </div>
      </div>
    </Fragment>
  );
}

export default Loginpage;
