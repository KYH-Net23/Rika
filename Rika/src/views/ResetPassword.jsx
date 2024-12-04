import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBack from "../common/ArrowBack.jsx";
import InputField from "./sections/AdminCreateProduct/InputField.jsx";

const ResetPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const apiUrl =
    "https://rika-identity-user-f5e3fddxg4bve2eg.swedencentral-01.azurewebsites.net/reset";

  const changePasswordUrl =
    "https://rika-identity-user-f5e3fddxg4bve2eg.swedencentral-01.azurewebsites.net/change-password";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.confirmPassword !== formData.password) {
      setErrors(["Passwords do not match."]);
      console.log(errors);
      return;
    }

    const response = await fetch(changePasswordUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        newPassword: formData.password,
      }),
    });

    if (response.status === 200) {
      setShowForm(false);
      setIsLoading(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      const errors = await response.json();
      errors.forEach((error) => {
        setErrors(error);
      });
    }
  };

  useEffect(() => {
    const InitiatePasswordReset = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetGuid: id,
          }),
        });
        if (response.status === 200) {
          setShowForm(true);
        } else {
          navigate("/login");
        }
      } catch (e) {
        console.log(e);
      }
    };

    InitiatePasswordReset();
  }, []);

  return (
    <div>
      {showForm ? (
        <div className="grid place-items-center h-screen">
          <form
            onSubmit={handleSubmit}
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
              label="Password"
              name="password"
              value={formData.password}
              type="password"
              onChange={handleChange}
              error={errors}
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              type="password"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
            >
              Reset Password
            </button>
          </form>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div className="w-full">
              <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin mx-auto"></div>
              <p className="text-lg text-center font-semibold">
                Password has been changed. Redirecting to the login page...
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
