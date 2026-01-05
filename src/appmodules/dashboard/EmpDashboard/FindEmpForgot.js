import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FindEmpForgot() {
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate();

  const Find = () => {
    if (!employeeId) {
      alert("Please enter Employee Id");
      return;
    }
    navigate(`/ResetEmpPass/${employeeId}`);
  };

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-6 col-lg-5">

            <div className="card shadow p-4 text-center">
              <h5 className="bg-primary text-white p-2 rounded">
                Enter Employee ID ( Create By Id )
              </h5>

              <input
                className="form-control my-3"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Employee Id Here..."
              />

              <button
                onClick={Find}
                className="btn btn-success w-100"
              >
                Find Employee
              </button>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FindEmpForgot;