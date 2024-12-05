import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBack from "./../common/ArrowBack.jsx";
import InputField from "./sections/AdminCreateProduct/InputField.jsx";

const Register = () => {
  const [errors, setErrors] = useState({});
  const [specialError, setSpecialError] = useState(null)
  const navigate = useNavigate();
  const apiUrl =
    "https://rika-identity-user-f5e3fddxg4bve2eg.swedencentral-01.azurewebsites.net/Customer/Register";

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        phoneNumber: '',
        streetAddress: '',
        postalCode: '',
        city: '',
        dateOfBirth: ''
    });

    const nameMapping = {
        username: 'Username',
        email: 'Email',
        password: 'Password',
        phoneNumber: 'PhoneNumber',
        streetAddress: 'StreetAddress',
        postalCode: 'PostalCode',
        city: 'City',
        dateOfBirth: 'DateOfBirth',
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = () => {
    const errors = {};
    if (!formData.username) errors.username = "User Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password !== formData.confirmpassword) {
      errors.password = "Passwords do not match.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (!formData.phoneNumber) errors.phoneNumber = "Phone Number is required.";
    if (!formData.postalCode) errors.postalCode = "Postal Code is required.";
    if (!formData.streetAddress)
      errors.streetAddress = "Street Address is required.";
    if (!formData.city) errors.city = "City is required.";
    if (!formData.dateOfBirth)
      errors.dateOfBirth = "Date of Birth is required.";
    return errors;
  };

    const handleRegistration = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                if (response.status === 200) {
                    console.log('Customer successfully created!');
                    navigate('/');
                } else if (response.status === 400) {
                    const data = await response.json();
                    console.log(data)
                    const apiErrors = {};

                    if (data.errors) {
                        Object.keys(data.errors).forEach((field) => {

                            const formField = Object.keys(nameMapping).find((key) => nameMapping[key] === field);

                            if (formField){
                                apiErrors[formField] = data.errors[field].join(' ');
                            }
                        });
                    }
                    console.log(data.password)
                    if(data.password){
                        Object.keys(data.password).forEach((field) => {
                            apiErrors.password = data.password[field];
                        })
                    }
                    setErrors(apiErrors);
                    if(data.message != null)
                    {
                        setSpecialError(data.message);
                    }
                }
            } catch (error) {
                console.error('Error during registration:', error);
            }
        }
   
    };

    return (
        <div className="flex font-mont items-center justify-center min-h-screen bg-gray-300 p-4">
            <form
                onSubmit={(e) => handleRegistration(e, formData)}
                className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3"
            >
                <div className="flex items-center justify-between mb-6">
                    <ArrowBack goBackTo="/login" />
                    <h2 className="text-xl sm:text-2xl text-center flex-grow text-gray-800">Customer Registration</h2>
                    <div className="sm:w-6"></div>
                </div>
                {/* User Name */}
                <InputField
                    label="User Name"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={errors.username}
                />
                {/* Email */}
                <InputField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <InputField
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full resize-none"
                        rows="3"
                        error={errors.password}
                        type="password"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm Password</label>
                    <InputField
                        name="confirmpassword"
                        value={formData.confirmpassword}
                        onChange={handleChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full resize-none"
                        rows="3"
                        error={errors.password}
                        type="password"
                    />
                </div>
                {/* Phone Number */}
                <InputField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    type="number"
                    error={errors.phoneNumber}
                />
                {/* Street Address */}
                <InputField
                    label="Street Address"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    error={errors.streetAddress}
                />
                   {/* Postal Code */}
                   <InputField
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    error={errors.postalCode}
                />
                {/* City */}
                <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                />
                {/* Date of Birth */}
                <InputField
                    label="Date of Birth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    type="date"
                    error={errors.dateOfBirth}
                />
                {/* Submit Button */}
                <button
                    id="createButton"
                    type="submit"
                    className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
                >
                    Register
                </button>

                {specialError && 
                    (<p className="w-full text-red-500 text-center mt-2">{specialError}</p>)
                } 

                <div className="w-full text-green-500 p-2 rounded mt-4 text-center">
                    <p id="successMessage" hidden>
                        User was successfully created!
                    </p>
                </div>
                <div className="w-full text-red-500 p-2 rounded mt-4 text-center">
                    <p id="failMessage" hidden>
                        Failed to create user.
                    </p>
                </div>
            </form>
        </div>
    )
    }

export default Register;
