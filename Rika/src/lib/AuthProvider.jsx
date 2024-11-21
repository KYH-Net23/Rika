import { createContext, useEffect, useState } from 'react';
import PropTypes from "prop-types";
import authApi from "./authApi.js";

export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const checkAuth = async () => {
        try{
            const response = await authApi.get('/authorize', {withCredentials: true});
            setIsAuthenticated(response.data.isAuthenticated);
            setUserRole(response.data.role);
        } catch {
            setIsAuthenticated(false);
            setUserRole("");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <UserContext.Provider value={{ userRole, isAuthenticated, setIsAuthenticated, setUserRole, user, setUser, checkAuth, loading }}>
            {children}
        </UserContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
