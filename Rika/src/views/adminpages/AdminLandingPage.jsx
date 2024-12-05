import { useContext, useEffect } from "react";
import { UserContext } from "../../lib/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../common/LogoutButton.jsx";

const AdminLandingPage = () => {
  const { userRole, isAuthenticated, checkAuth, user } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const authorizeUser = async () => {
      await checkAuth();
    };

    authorizeUser();
  }, [checkAuth]);

  if (!isAuthenticated) {
    return (
      <div className="text-center text-red-500 mt-10">
        I am not authenticated.
      </div>
    );
  }

  if (userRole !== "Admin") {
    return (
      <div className="text-center text-red-500 mt-10">I am not an admin.</div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Admin Info */}
      <div className="flex items-center bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h2 className="text-lg font-semibold">Welcome, Admin</h2>
          <p className="text-gray-500">{user?.user?.email}</p>
        </div>
      </div>

      {/* Navigation Options */}
      <div className="space-y-4">
        {/* Primary Actions */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <ul className="space-y-2">
            {/* Create Product */}
            <li
              className="flex items-center justify-between cursor-pointer"
              onClick={() => navigate("/productscreate")}
            >
              <span className="flex items-center">
                <i className="text-xl mr-4">➕</i>
                Create Product
              </span>
              <i className="text-gray-500">➔</i>
            </li>

            {/* View All Invoices */}
            <li
              className="flex items-center justify-between cursor-pointer"
              onClick={() => navigate("/all-invoices")}
            >
              <span className="flex items-center">
                <i className="text-xl mr-4">📄</i>
                View All Invoices
              </span>
              <i className="text-gray-500">➔</i>
            </li>

            {/* View All Inventories */}
            <li
              className="flex items-center justify-between cursor-pointer"
              onClick={() => navigate("/all-inventories")}
            >
              <span className="flex items-center">
                <i className="text-xl mr-4">📦</i>
                View All Inventories
              </span>
              <i className="text-gray-500">➔</i>
            </li>

            {/* Manage Users */}
            <li
              className="flex items-center justify-between cursor-pointer"
              onClick={() => navigate("/users")}
            >
              <span className="flex items-center">
                <i className="text-xl mr-4">👥</i>
                Manage Users
              </span>
              <i className="text-gray-500">➔</i>
            </li>

            {/* Reports & Analytics */}
            <li
              className="flex items-center justify-between cursor-pointer"
              onClick={() => navigate("/reportsandanalytics")}
            >
              <span className="flex items-center">
                <i className="text-xl mr-4">📊</i>
                Reports & Analytics
              </span>
              <i className="text-gray-500">➔</i>
            </li>
          </ul>
        </div>

        {/* Secondary Links */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <ul className="space-y-2">
            {/* System Settings */}
            <li
              className="flex items-center justify-between cursor-pointer"
              onClick={() => navigate("/error-not-existing")}
            >
              <span className="flex items-center">
                <i className="text-xl mr-4">⚙</i>
                System Settings
              </span>
              <i className="text-gray-500">➔</i>
            </li>

            {/* Help & Support */}
            <li
              className="flex items-center justify-between cursor-pointer"
              onClick={() => navigate("/error-not-existing")}
            >
              <span className="flex items-center">
                <i className="text-xl mr-4">❓</i>
                Help & Support
              </span>
              <i className="text-gray-500">➔</i>
            </li>

            {/* Logout Button */}
            <LogoutButton />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLandingPage;
