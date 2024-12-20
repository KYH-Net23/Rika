﻿import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../common/LoginButton.jsx";
import authApi from "../lib/authApi.js";
import { UserContext } from "../lib/AuthProvider.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { userRole, isAuthenticated, checkAuth, setUser } =
    useContext(UserContext);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === "Customer") {
        navigate("/products");
      } else if (userRole === "Admin") {
        navigate("/products");
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    await new Promise(x => setTimeout(x, 1000))
    const endPoint = "/TokenGenerator/login";
    try {
      const response = await authApi.post(
        endPoint,
        { email, password },
        { withCredentials: true },
      );
      if (response.status === 200) {
        const userData = response.data;
        setUser({
          ...userData,
        });
        await checkAuth();
      }
      else if(response.status === 401) {
        setPasswordError("Invalid credentials. Please check your email / password.")
        console.log(response)
      }
    } catch (error) {
      console.error("Error during login:", error);
      setPasswordError("Invalid credentials. Please check your email / password.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex font-mont flex-col items-center justify-center">
      {loading ? (
        <div className="w-full flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin mx-auto"></div>
            <p className="text-lg font-semibold mt-4">Logging you in...</p>
            <p className="text-sm text-gray-500">Please wait a moment</p>
          </div>
        </div>
      ) : null}
      <div className="mb-10 mt-16">
        <h1 className="text-5xl text-left">RIKA</h1>
        <h2>Online Shopping</h2>
      </div>
      <div className="w-11/12 text-center mb-10">
        <h2 className="text-2xl font-semibold mb-3">Welcome!</h2>
        <p className="text-gray-500">
          Please login or sign to continue our app
        </p>
      </div>
      <form
        className="sm:w-11/12 w-11/12 flex flex-col items-center mb-4 md:w-8/12 2xl:w-4/12"
        onSubmit={handleLogin}
      >
        <label className="font-semibold w-11/12" htmlFor="email">
          Email
        </label>
        <input
          className="w-11/12 border-b border-gray-300 mb-6"
          type="text"
          name="email"
          id="email"
          placeholder="Enter email address"
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

        <label className="font-semibold w-11/12" htmlFor="password">
          Password
        </label>
        <input
          className="w-11/12 border-b border-gray-300 mb-12"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}

        <div className="flex justify-center items-center gap-2 mb-4">
          <p className="mb-1">Remember me</p>
          <input type="checkbox" disabled={loading} />
        </div>
        <LoginButton
          type="submit"
          disabled={loading}
          color="black"
          label={"Log in"}
        >
          {loading ? "Processing..." : "Login"}
        </LoginButton>
        <LoginButton
          color="slategrey"
          label={"Forgot your password?"}
          disabled={loading}
          onClick={() => navigate("/forgotpassword")}
        />
      </form>

      <div className="mb-8 text-gray-400">───────────── or ─────────────</div>
      <div className="sm:w-11/12 w-11/12 flex flex-col items-center md:w-8/12 2xl:w-4/12">
        <LoginButton
          color="#00cf34"
          label={"Register new user"}
          disabled={loading}
          onClick={() => navigate("/register")}
        />

        {/* Facebook Login - Navigating to ErrorNotExisting */}
        <LoginButton
          color="#3b5998"
          label={"Continue with Facebook"}
          disabled={loading}
          onClick={() => navigate("/error-not-existing")}
        />

        {/* Google Login - Navigating to ErrorNotExisting */}
        <LoginButton
          color="#FFF"
          textColor="#666"
          label={"Continue with Google"}
          disabled={loading}
          onClick={() => navigate("/error-not-existing")}
        />

        {/* Apple Login - Navigating to ErrorNotExisting */}
        <LoginButton
          color="#FFF"
          textColor="#666"
          label={"Continue with Apple"}
          disabled={loading}
          onClick={() => navigate("/error-not-existing")}
        />
      </div>
    </div>
  );
};

export default Login;
