import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ResetEmpPass() {
  const [employee, setEmployee] = useState(null);
  const [newPass, setNewPass] = useState("");
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const API = process.env.REACT_APP_BACKEND_API && "http://localhost:9800";
  useEffect(() => {
    axios.get(`${API}/FindById/${employeeId}`).then((res) => {
      if (res.data.status === 250) {
        setEmployee(res.data.EmployeeDetails);
      } else {
        alert(res.data.message);
      }
    });
  }, [employeeId]);

  const updatePassword = () => {
    if (!newPass) {
      alert("Please enter new password");
      return;
    }

    axios.put(`${API}/updatePassword/${employeeId}`, {
      newPass: newPass
    }).then((res) => {
      alert(res.data.message);
      navigate("/EmployeeLogin");
    });
  };

  if (!employee) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-6 col-lg-5">
            
            <div className="card shadow p-4">
              <h3 className="text-center mb-3">Reset Password</h3>

              <p className="text-center text-muted">
                <b>{employee.fullname}</b>
              </p>

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />

              <button
                className="btn btn-primary w-100"
                onClick={updatePassword}
              >
                Update Password
              </button>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ResetEmpPass;
