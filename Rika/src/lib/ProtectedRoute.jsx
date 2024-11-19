// TODO implement this

import React, { useContext } from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "./AuthProvider.jsx";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { userRole, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate("/login")
        return null
    }

    return children;
};

export default ProtectedRoute;