import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../lib/authApi.js";
import { UserContext } from "../lib/AuthProvider.jsx";

const LogoutButton = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUserRole } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            const response = await authApi.post("/logout", {}, {withCredentials: true});

            if (response.status === 200) {
                setIsAuthenticated(false); 
                setUserRole(null); 
                navigate("/login")
            }
        } catch {
            console.log("Failed to logout");
        }
    };

    return (
        <button onClick={handleLogout} className="bg-red-900 p-4">Logout</button>
    );
};

export default LogoutButton;
