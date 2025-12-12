import React from 'react'
import { Navigate } from 'react-router-dom'

export function Protect({ children }) {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("No Token")
    return <Navigate to="/Login" />;
  }
  else{
  return children;
}
}
