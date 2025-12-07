// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const SProtectedRoute = ({ children, role = "student" }) => {
  const storedUser = localStorage.getItem(role);

  if (!storedUser) {
    return <Navigate to="/student-login" replace />;
  }

  return children;
};

export default SProtectedRoute;
