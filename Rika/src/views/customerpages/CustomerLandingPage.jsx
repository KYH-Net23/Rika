import { useContext, useEffect } from "react";
import { UserContext } from "../../lib/AuthProvider.jsx";
import LogoutButton from "../../common/LogoutButton.jsx";
import ArrowBack from "../../common/ArrowBack.jsx";

const CustomerLandingPage = () => {
  const { userRole, isAuthenticated, checkAuth, user } =
    useContext(UserContext);

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

  if (userRole !== "Customer") {
    return (
      <div className="text-center text-red-500 mt-10">I am not a customer.</div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <ArrowBack />
        <h1 className="text-xl font-bold">Profile</h1>
        <button className="text-2xl">⚙</button>
      </div>

      {/* Profile Info */}
      <div className="flex items-center bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <h2 className="text-lg font-semibold">Welcome to your profile</h2>
          <p className="text-gray-500">{user?.user?.email}</p>
        </div>
      </div>

      {/* Navigation Options */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span className="flex items-center">
                <i className="text-xl mr-4">👤</i>
                Personal Details
              </span>
              <i className="text-gray-500">➔</i>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center">
                <i className="text-xl mr-4">👜</i>
                My Order
              </span>
              <i className="text-gray-500">➔</i>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center">
                <i className="text-xl mr-4">❤️</i>
                My Favourites
              </span>
              <i className="text-gray-500">➔</i>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center">
                <i className="text-xl mr-4">🚚</i>
                Shipping Address
              </span>
              <i className="text-gray-500">➔</i>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center">
                <i className="text-xl mr-4">💳</i>
                My Card
              </span>
              <i className="text-gray-500">➔</i>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center">
                <i className="text-xl mr-4">⚙</i>
                Settings
              </span>
              <i className="text-gray-500">➔</i>
            </li>
          </ul>
        </div>

        {/* Secondary Links */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span className="flex items-center">
                <i className="text-xl mr-4">❓</i>
                FAQs
              </span>
              <i className="text-gray-500">➔</i>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center">
                <i className="text-xl mr-4">🛡</i>
                Privacy Policy
              </span>
              <i className="text-gray-500">➔</i>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center">
                <i className="text-xl mr-4">📞</i>
                Contact Us
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

export default CustomerLandingPage;
