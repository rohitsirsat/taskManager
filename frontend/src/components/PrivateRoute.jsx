import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContex.jsx";
import { Loader } from "./Loader";

function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader message="Verifying user..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateRoute;
