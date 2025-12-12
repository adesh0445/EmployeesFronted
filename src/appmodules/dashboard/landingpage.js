import React, { Fragment } from "react/jsx-runtime";
import Recharts from "./recharts";
import { useContext } from "react";
import { EmployeesContext } from "./context";

function Landingpage() {
  // ⭐ employees undefined होने से बचाने के लिए default value []
  const { employees = [] } = useContext(EmployeesContext);

  // ⭐ Safe filtering
  const maleEmp = employees.filter(emp => emp.gender === "male");
  const femaleEmp = employees.filter(emp => emp.gender === "female");

  return (
    <Fragment>
      <div className="container-fluid mt-3">

        <div className="row">

          {/* TOTAL EMPLOYEES */}
          <div className="p-3 col-12 col-sm-6 col-lg-3 bg-success text-white shadow rounded mb-3">
            <h2>Total Employees</h2>
            <h1>{employees.length}</h1>
          </div>

          {/* MALE EMPLOYEES */}
          <div className="col-12 col-sm-6 col-lg-3 mb-3">
            <div className="p-3 bg-primary text-white shadow rounded">
              <h2>Male Employees</h2>
              <h1>{maleEmp.length}</h1>
            </div>
          </div>

          {/* FEMALE EMPLOYEES */}
          <div className="col-12 col-sm-6 col-lg-3 mb-3">
            <div className="p-3 bg-danger text-white shadow rounded">
              <h2>Female Employees</h2>
              <h1>{femaleEmp.length}</h1>
            </div>
          </div>

          {/* CHART FULL WIDTH */}
          <div className="col-12 mb-3">
            <div className="p-3 shadow rounded">
              <Recharts />
            </div>
          </div>

        </div>
      </div>
    </Fragment>
  );
}

export default Landingpage;
