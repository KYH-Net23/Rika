import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../lib/authApi.js";
import { UserContext } from "../lib/AuthProvider.jsx";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserRole } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const response = await authApi.post(
        "/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsAuthenticated(false);
        setUserRole(null);
        navigate("/login");
      }
    } catch {
      console.log("Failed to logout");
    }
  };

  return (
    <li
      className="flex items-center justify-between cursor-pointer text-red-500 font-bold"
      onClick={handleLogout}
    >
      <span className="flex items-center">
        <i className="text-xl mr-4">🚪</i>
        Logout
      </span>
      <i className="text-gray-500">➔</i>
    </li>
  );
};

export default LogoutButton;
