import { useState } from "react";
import ArrowBack from "./../common/ArrowBack.jsx";
import InputField from "./sections/AdminCreateProduct/InputField.jsx";

const ForgotYourPassword = () => {
    const userIdApiCall = 'https://rika-identity-user-f5e3fddxg4bve2eg.swedencentral-01.azurewebsites.net/getuserid'


  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(userIdApiCall, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        if (response.status === 200) {
            console.log('response.data')
            console.log('Reset password mail have been sent!');
        } else if (response.status === 400) {
            const data = await response.json();
            console.log(data)
        }
        }
         catch (error) {
            console.error('Error during registration:', error);
        }
    }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [formData, setFormData] = useState({
    receiver: "",
  });

  return (
    <form
      onSubmit={(e) => handleRegistration(e, formData)}
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
        name="receiver"
        value={formData.receiver}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
      >
        Reset Password
      </button>
    </form>
  );

}

export default ForgotYourPassword;
