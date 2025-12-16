import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Employeeslist() {

  const [Employees, setEmployees] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortType, setSortType] = useState("new");
  const API = process.env.REACT_APP_BACKEND_API || "http://localhost:9800";

  const EmployeesShow = () => {
    const token = localStorage.getItem("token")
    axios.get(`${API}/Employeeslist`,{headers:{Authorization:`Bearer ${token}`}}).then((res) => {
      setEmployees(res.data.Employeeslist);
    });
  };

  const handleDelete = (EmpId) => {
    const token = localStorage.getItem("token")
    axios.delete(`${API}/Employeesdelete/${EmpId}`,{headers:{Authorization:`Bearer ${token}`}}).then((res) => {
      alert(res.data.message);
      if (res.data.status === 250) {
        EmployeesShow();
      }
    });
  };

  useEffect(() => {
    EmployeesShow();
  }, []);

  const searchOnChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filterData = Employees.filter((Employee) => {
    return (
      Employee.fullname.toLowerCase().includes(searchInput.toLowerCase()) ||
      Employee.phone.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  const sortedData = [...filterData].sort((a, b) => {
    if (sortType === "az") {
      return a.fullname.localeCompare(b.fullname);
    }
    if (sortType === "za") {
      return b.fullname.localeCompare(a.fullname);
    }
    if (sortType === "new") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortType === "old") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  return (
    <Fragment>
      <div className='col-md-12 col-sm-12 '>

        <div className='search'>
          <label>Employee Search</label>
          <input type='text' placeholder='Search Here..' value={searchInput} onChange={searchOnChange} />

          <select className='sort btn btn-success' value={sortType} onChange={(e) => setSortType(e.target.value)}>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
            <option value="new">New First</option>
            <option value="old">Old First</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Job Type</th>
              <th>Salary /Month</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((Employee, index) => (
              <tr key={index}>
                <td>{Employee.fullname}</td>
                <td>{Employee.phone}</td>
                <td>{Employee.email}</td>
                <td>{Employee.gender}</td>
                <td>{Employee.jobtype}</td>
                <td>{Employee.salary}{` Rs`}</td>

                <td>
                  <button className="btn Deletebtn btn-danger" onClick={() => handleDelete(Employee._id)}>
                    <FaTrash />
                  </button>

                  <Link className="btn Editbtn btn-success" to={`/Dashboard/Editemployee/${Employee._id}`}>
                    <FaEdit />
                  </Link>
                  <Link className="btn btn-info mx-1" to={`/Dashboard/Viewemployee/${Employee._id}`} >
                  <FaEye />
                </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </Fragment>
  );
}

export default Employeeslist;
