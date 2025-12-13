import { useEffect, useState } from "react";
import axios from "axios";
import { EmployeesContext } from "./context";

function EmployeesProvider({ children }) {

  const [employees, setEmployees] = useState([]);

const API = process.env.REACT_APP_BACKEND_API || "http://localhost:9800";


  const loadEmployees = () => {
    const token = localStorage.getItem("token");

    axios.get(`${API}/Employeeslist`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      setEmployees(res.data.Employeeslist);
    })
    .catch(() => {
      alert("Failed to load employees");
    });
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <EmployeesContext.Provider value={{ employees }}>
      {children}
    </EmployeesContext.Provider>
  );
}

export default EmployeesProvider;
