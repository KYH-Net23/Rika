import { useState } from "react";
import ArrowBack from "../../../../common/ArrowBack";
import CartCard from "./cart/CartCard";

const YourCart = ({ data, totalPrice, slideNumber, clickFunc }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    streetAddress: "",
    zipCode: "",
    city: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{7,15}$/;
    const zipCodeRegex = /^[0-9]{5}$/;
    const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;

    if (!formData.firstName.trim()) {
      validationErrors.firstName = "First name is required.";
    } else if (!nameRegex.test(formData.firstName)) {
      validationErrors.firstName = "First name must contain only letters.";
    }

    if (!formData.lastName.trim()) {
      validationErrors.lastName = "Last name is required.";
    } else if (!nameRegex.test(formData.lastName)) {
      validationErrors.lastName = "Last name must contain only letters.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Enter a valid email address.";
    }

    if (!formData.telephone.trim()) {
      validationErrors.telephone = "Telephone number is required.";
    } else if (!phoneRegex.test(formData.telephone)) {
      validationErrors.telephone = "Enter a valid telephone number.";
    }

    if (!formData.streetAddress.trim()) {
      validationErrors.streetAddress = "Street address is required.";
    }

    if (!formData.zipCode.trim()) {
      validationErrors.zipCode = "ZIP code is required.";
    } else if (!zipCodeRegex.test(formData.zipCode)) {
      validationErrors.zipCode = "Enter a valid 5-digit ZIP code.";
    }

    if (!formData.city.trim()) {
      validationErrors.city = "City is required.";
    }

    if (!formData.country.trim()) {
      validationErrors.country = "Country is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSaveToLocalStorage = () => {
    if (validate()) {
      localStorage.setItem("customerInfo", JSON.stringify(formData));
      clickFunc();
    }
  };

  return (
    <>
      <ArrowBack goBackTo={"/products"} />
      <section className="flex flex-col min-w-[355px] md:min-w-[562px]">
        <h3 className="font-mont font-semibold">
          <span className="bg-[#CCC] py-1 px-[10px] rounded-full mr-2">
            {slideNumber}
          </span>
          Order Details
        </h3>
        <div className="my-4 flex flex-col gap-3">
          {data.map((cartItem) => (
            <CartCard key={cartItem.id} data={cartItem} />
          ))}
          <div className="w-full border-t border-[#CCC] my-4" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="flex font-mont font-semibold justify-between">
            <span>Total:</span>
            <span>
              $
              {totalPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </h3>
          <h3 className="flex font-mont justify-between">
            <span>VAT:</span>
            <span>
              $
              {(totalPrice * 0.25).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </h3>
        </div>
        <div className="w-full border-t border-[#CCC] my-4" />
        <form className="flex flex-col gap-4 mt-3">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="font-mont w-full border p-2 rounded"
              />
              {errors.firstName && (
                <p className="font-mont text-red-500 text-sm">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="font-mont w-full border p-2 rounded"
              />
              {errors.lastName && (
                <p className="font-mont text-red-500 text-sm">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="font-mont w-full border p-2 rounded"
              />
              {errors.email && (
                <p className="font-mont text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="tel"
                name="telephone"
                placeholder="Telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="font-mont w-full border p-2 rounded"
              />
              {errors.telephone && (
                <p className="font-mont text-red-500 text-sm">
                  {errors.telephone}
                </p>
              )}
            </div>
          </div>
          <div>
            <input
              type="text"
              name="streetAddress"
              placeholder="Street Address"
              value={formData.streetAddress}
              onChange={handleChange}
              className="font-mont w-full border p-2 rounded"
            />
            {errors.streetAddress && (
              <p className="font-mont text-red-500 text-sm">
                {errors.streetAddress}
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
                className="font-mont w-full border p-2 rounded"
              />
              {errors.zipCode && (
                <p className="font-mont text-red-500 text-sm">
                  {errors.zipCode}
                </p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="font-mont w-full border p-2 rounded"
              />
              {errors.city && (
                <p className="font-mont text-red-500 text-sm">{errors.city}</p>
              )}
            </div>
          </div>
          <div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="font-mont w-full border p-2 rounded"
            />
            {errors.country && (
              <p className="font-mont text-red-500 text-sm">{errors.country}</p>
            )}
          </div>
        </form>
        <div className="flex w-full justify-end mt-6">
          <button
            onClick={handleSaveToLocalStorage}
            className="flex gap-5 justify-center px-4 py-2.5 w-full max-w-[325px] bg-black rounded-xl leading-[33.28px] text-white transition-transform duration-200 transform hover:scale-105 hover:bg-gray-700"
          >
            <span className="font-mont font-medium text-base">
              Shipping Options
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default YourCart;
