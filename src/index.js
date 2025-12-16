import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./appmodules/css/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import Welcome from "./welcome";
import Loginpage from "./appmodules/Auth/loginpage";
import Registerpage from "./appmodules/Auth/registerpage";
import Dashboard from "./appmodules/dashboard/dashboard";
import Employeeslist from "./appmodules/dashboard/employeeslist";
import Addemployee from "./appmodules/dashboard/addemployee";
import Editemployee from "./appmodules/dashboard/editemployee";
import Landingpage from "./appmodules/dashboard/landingpage";
import Recharts from "./appmodules/dashboard/recharts";
import EmployeesProvider from "./appmodules/dashboard/EmpProvider";
import { Protect } from "./appmodules/dashboard/protect";
import Contact from "./appmodules/helpcenter/contact";
import Viewemployee from "./appmodules/dashboard/viewemployee";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    {/* ⭐ पूरे App को Context से wrap किया */}
    <EmployeesProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="Login" element={<Loginpage />} />
          <Route path="Register" element={<Registerpage />} />
          <Route path="/Contact" element={<Contact></Contact>} />

          <Route path="Dashboard" element={<Protect><Dashboard /></Protect>}>
            <Route index element={<Landingpage />} />
            <Route path="Employeeslist" element={<Employeeslist />} />
            <Route path="Addemployee" element={<Addemployee />} />
            <Route path="Editemployee/:id" element={<Editemployee />} />
            <Route path="Recharts" element={<Recharts />} />
            <Route path="Viewemployee/:id" element={<Viewemployee></Viewemployee>}/>
          </Route>

        </Routes>
      </BrowserRouter>

    </EmployeesProvider>

  </React.StrictMode>
);
