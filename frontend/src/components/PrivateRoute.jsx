import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContex";
import React from "react";

function PrivateRoute({ children }) {
  const { token, user } = useAuth();

  if (!token && !user?._id) return <Navigate to="/login" replace />;

  return children;
}

export default PrivateRoute;
