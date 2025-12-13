import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Registerpage() {
  const [username,setusername] = useState("");
  const [password,setpassword] = useState("");

  const navigate = useNavigate()
  const userchange =(e)=>{
    setusername(e.target.value);
  }

  const passchange = (e)=>{
    setpassword(e.target.value);
  }
const API = process.env.REACT_APP_BACKEND_API || "http://localhost:9800";

  const handleRegister = ()=>{
    const userData = {username,password}
    axios.post(`${API}/Registerpage`,userData).then((res)=>{
      if(res.data.status===450){
        alert(res.data.message)
      }
      else if(res.data.status===451){
        alert(res.data.message)
      }
      else if(res.data.status===250){
        alert(res.data.message)
        navigate("/Login")
      }
    })
  }


  return (
    <Fragment>
        <div className='container-fluid Registerpage'>
         <h1 className='col-md-12 text-center'>Registerpage</h1>
         <div className='row text-center'>
          <div className='col-md-12 fullinputs'>
            <div className='inputs'>
          <li className='inputname'><h3>Username</h3></li>
          <li><input type='text' value={username} onChange={userchange} className='input' placeholder='Username'/></li>
          <li className='inputname'><h3>Create Password</h3></li>

          <li><input type='password' value={password} onChange={passchange} className='input' placeholder='Create Password'/></li>
          <button onClick={handleRegister} className='btn btn-success'>Register</button>
          <Link to="/Login" className="text-center text-light d-block">
            Already have an account? Login
          </Link>
            </div>
          </div>
      </div>
    </div>
    </Fragment>
  )
}

export default Registerpage