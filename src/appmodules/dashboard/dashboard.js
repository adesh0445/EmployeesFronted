import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../shares/header";
import Sidebar from "../../shares/sidebar";

function Dashboard() {
  return (
    <Fragment>
      <Header />

      <div className="sidecon">

        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="content">
          <div className="cont p-3">
            
            <Outlet />
          </div>
        </div>

      </div>
    </Fragment>
  );
}

export default Dashboard;
