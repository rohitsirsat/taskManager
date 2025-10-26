import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContex.jsx";
import React from "react";

function PublicRoute({ children }) {
  const { token, user } = useAuth();

  if (token && user?._id) return <Navigate to="/projects" replace />;

  return children;
}

export default PublicRoute;
