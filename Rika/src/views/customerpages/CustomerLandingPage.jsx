import React, { useContext, useEffect } from "react";
import { UserContext } from "../../lib/AuthProvider.jsx";
import LogoutButton from "../../common/LogoutButton.jsx";

const CustomerLandingPage = () => {
  const { userRole, isAuthenticated, checkAuth } = useContext(UserContext);

  useEffect(() => {
    const authorizeUser = async () => {
      await checkAuth();
    };

    authorizeUser();
  }, [checkAuth]);

  if (!isAuthenticated) {
    return <div>I am not authenticated.</div>;
  }

  if (userRole !== "Customer") {
    return <div>I am not a customer.</div>;
  }

  return (
    <div>
      <h1>Welcome customer!</h1>
      <LogoutButton />
    </div>
  );
};

export default CustomerLandingPage;
