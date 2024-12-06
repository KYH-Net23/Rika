import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./AuthProvider.jsx";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { userRole, isAuthenticated, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ProtectedRoute Logs:");
    console.log("Loading:", loading);
    console.log("Is Authenticated:", isAuthenticated);
    console.log("User Role:", userRole);
    console.log("Required Role:", requiredRole);

    if (!loading) {
      if (!isAuthenticated) {
        console.log("User is not authenticated. Redirecting to /login.");
        navigate("/login");
      } else if (requiredRole && userRole !== requiredRole) {
        console.log(
          `User role (${userRole}) does not match required role (${requiredRole}). Redirecting to /.`
        );
        navigate("/");
      }
    }
  }, [isAuthenticated, userRole, requiredRole, loading, navigate]);

  if (loading) {
    console.log("Auth check is still loading...");
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isAuthenticated && (!requiredRole || userRole === requiredRole)) {
    console.log("User is authorized. Rendering children.");
    return children;
  }

  console.log("User is unauthorized or not authenticated.");
  return null;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string,
};

export default ProtectedRoute;
