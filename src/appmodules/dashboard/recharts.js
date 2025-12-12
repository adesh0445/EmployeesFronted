import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import { EmployeesContext } from "./context";
function Recharts() {

  // Provider se employee data
  const { employees } = useContext(EmployeesContext);

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={employees}
          margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />

          <XAxis
            dataKey="fullname"
            stroke="white"
            tick={{ fill: "white", fontSize: 12 }}
          />

          <YAxis
            stroke="white"
            tick={{ fill: "white", fontSize: 12 }}
          />

          <Tooltip
            formatter={(value) => ` ${value}`}
            labelStyle={{ color: "#fff" }}
            contentStyle={{
              background: "#000",
              border: "1px solid #555",
              borderRadius: "6px",
              color: "#fff"
            }}
          />

          {/* Salary bar */}
          <Bar dataKey="salary" fill="#4ade80" barSize={40} />
          <Bar dataKey="jobtype" fill="#4ade80" barSize={40} />


          {/* Jobtype ko number nahi samjh payega, isliye hata diya — chaahe to tooltip me dikha dunga */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Recharts;
