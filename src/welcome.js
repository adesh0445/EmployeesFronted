import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fa';
import axios from 'axios';

function Welcome() {
  const [appmenu, setappmenu] = useState([]);
     const [textIndex, setTextIndex] = useState(0);  // FOR ANIMATED TEXT
const API = process.env.REACT_APP_BACKEND_API && "http://localhost:9800";


  const appApi = () => {
    axios.get(`${API}/applist`).then((res) => {
      setappmenu(res.data.applist);
    });
  };
  useEffect(() => {
    appApi();
  }, []);

  const messages = [
    "Welcome To Adesh Web",
    "This is an Employee Management System",
    "Manage Employees, Roles & Attendance",
    "Secure Login & Easy Registration",
    "Powered by Adesh Web EMS"
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <div className="container-fluid text-center welcome py-5">
        <div className="col-12 mb-4">
        <h3 className='m-4'>
        {messages[textIndex]}
        </h3>        </div>
        
        <div className="row justify-content-center gy-4">
          <p className="text-light">
            Please <strong>Login</strong> or <strong>Register</strong> to continue
          </p>
          {appmenu.map((m, index) => {
            const IconComponent = Icons[m.appicon] || Icons.FaUserAlt;
            return (
              <div key={index} className="card col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
                <div className="w-100 shadow-sm border-0">
                  <Link to={m.applink} className="card-body text-decoration-none d-flex flex-column align-items-center justify-content-center">
                    <h1 className="text-primary mb-3"><IconComponent /></h1>
                    <h5 className="text-dark">{m.appname}</h5>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default Welcome;
