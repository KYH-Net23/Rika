import { useState } from "react";
import ArrowBack from "./../common/ArrowBack.jsx";
import InputField from "./sections/AdminCreateProduct/InputField.jsx";

const ForgotYourPassword = () => {
  const userIdApiCall =
    "https://rika-identity-user-f5e3fddxg4bve2eg.swedencentral-01.azurewebsites.net/send-reset-password-email";
  const [email, setEmail] = useState("");
  const [isEmailSent, setisEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (email.length < 1) {
      setEmailError("Email is required.");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch(userIdApiCall, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      if (response.status === 200) {
        setisEmailSent(true);
      } else if (response.status === 400) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return isEmailSent ? (
    <div className="flex font-mont items-center justify-center min-h-screen bg-gray-300 p-4">
      <div className="flex flex-col w-6/12 items-center bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="mb-4 text-2xl text-center">
          Email has been sent. Please close this page and follow the
          instructions in the email.
        </h1>
      </div>
    </div>
  ) : (
    <div className="grid place-items-center h-screen">
      <form
        onSubmit={(e) => handleRegistration(e, email)}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3"
      >
        <div className="flex items-center justify-between mb-6">
          <ArrowBack goBackTo="/login" />
          <h2 className="text-xl sm:text-2xl text-center flex-grow text-gray-800">
            Reset your password
          </h2>
          <div className="sm:w-6"></div>
        </div>
        <InputField
          label="Email"
          name="email"
          value={email}
          onChange={handleChange}
          error={emailError}
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotYourPassword;
