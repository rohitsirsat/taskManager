import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContex.jsx";
import { Loader } from "./Loader";

function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader message="Verifying user" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/projects" replace />;
  }

  return children;
}

export default PublicRoute;
