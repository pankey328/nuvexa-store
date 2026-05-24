import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // If the user is logged in, render the protected component
  if (user && isAuthenticated) {
    return children;
  }
  // If not logged in, redirect them to the Login page.
  return <Navigate to="/login" replace />;
};

export default Protected;
