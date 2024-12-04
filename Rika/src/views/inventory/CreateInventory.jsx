import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBack from "../../common/ArrowBack";
import { createInventory } from "../../lib/InventoryProvider";

const CreateInventory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: 0,
    inventoryName: "",
    storeName: "",
    location: {
      country: "",
      streetAddress: "",
      city: "",
      zipCode: "",
    },
    description: "",
    capacity: 0,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        location: { ...formData.location, [key]: value },
      });
      validateField(name, value); 
    } else {
      setFormData({ ...formData, [name]: value });
      validateField(name, value); 
    }
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "inventoryName" && (!value || value.length > 100)) {
      error = "Inventory Name is required and cannot exceed 100 characters.";
    } else if (name === "storeName" && (!value || value.length > 50)) {
      error = "Store Name is required and cannot exceed 50 characters.";
    } else if (name === "description" && (!value || value.length > 200)) {
      error = "Description is required and cannot exceed 200 characters.";
    } else if (name === "capacity" && (value === "" || value < 0)) {
      error = "Capacity must be a positive number.";
    } else if (name === "location.country" && !value) {
      error = "Country is required.";
    } else if (name === "location.streetAddress" && !value) {
      error = "Street Address is required.";
    } else if (name === "location.city" && !value) {
      error = "City is required.";
    } else if (
      name === "location.zipCode" &&
      !/^\d{5}(-\d{4})?$/.test(value) 
    ) {
      error = "Invalid Zip Code format.";
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const isFormValid = () => {
    const requiredFields = [
      "inventoryName",
      "storeName",
      "description",
      "capacity",
      "location.country",
      "location.streetAddress",
      "location.city",
      "location.zipCode",
    ];

    return requiredFields.every(
      (field) => !errors[field] && getFieldValue(field) !== ""
    );
  };

  const getFieldValue = (field) => {
    if (field.startsWith("location.")) {
      const key = field.split(".")[1];
      return formData.location[key];
    }
    return formData[field];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await createInventory(formData); 
      setFormData({
        inventoryName: "",
        storeName: "",
        location: {
          country: "",
          streetAddress: "",
          city: "",
          zipCode: "",
        },
        description: "",
        capacity: 0,
      });
      setSuccessMessage("Inventory created successfully!");
      setErrors({});
      setTimeout(() => navigate("/all-inventories"), 1500);
    } catch (error) {
      setErrorMessage("Failed to create inventory. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <nav className="flex justify-between items-center mb-4">
        <div className="flex-none">
          <ArrowBack goBackTo="/all-inventories" />
        </div>
      </nav>

      <h1 className="text-2xl font-bold mb-6 text-center">Create Inventory</h1>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4 text-center">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 text-center">
          {errorMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">Inventory Name</label>
          <input
            type="text"
            name="inventoryName"
            value={formData.inventoryName}
            onChange={handleInputChange}
            placeholder="Enter inventory name"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.inventoryName ? "border-red-500" : "focus:ring-blue-400"
            }`}
          />
          {errors.inventoryName && (
            <p className="text-red-500 text-sm mt-1">{errors.inventoryName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Store Name</label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleInputChange}
            placeholder="Enter store name"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.storeName ? "border-red-500" : "focus:ring-blue-400"
            }`}
          />
          {errors.storeName && (
            <p className="text-red-500 text-sm mt-1">{errors.storeName}</p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Location</h2>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Country</label>
            <input
              type="text"
              name="location.country"
              value={formData.location.country}
              onChange={handleInputChange}
              placeholder="Enter country"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors["location.country"] ? "border-red-500" : "focus:ring-blue-400"
              }`}
            />
            {errors["location.country"] && (
              <p className="text-red-500 text-sm mt-1">{errors["location.country"]}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Street Address</label>
            <input
              type="text"
              name="location.streetAddress"
              value={formData.location.streetAddress}
              onChange={handleInputChange}
              placeholder="Enter street address"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors["location.streetAddress"]
                  ? "border-red-500"
                  : "focus:ring-blue-400"
              }`}
            />
            {errors["location.streetAddress"] && (
              <p className="text-red-500 text-sm mt-1">{errors["location.streetAddress"]}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <input
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleInputChange}
              placeholder="Enter city"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors["location.city"] ? "border-red-500" : "focus:ring-blue-400"
              }`}
            />
            {errors["location.city"] && (
              <p className="text-red-500 text-sm mt-1">{errors["location.city"]}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Zip Code</label>
            <input
              type="text"
              name="location.zipCode"
              value={formData.location.zipCode}
              onChange={handleInputChange}
              placeholder="Enter zip code"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors["location.zipCode"] ? "border-red-500" : "focus:ring-blue-400"
              }`}
            />
            {errors["location.zipCode"] && (
              <p className="text-red-500 text-sm mt-1">{errors["location.zipCode"]}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.description ? "border-red-500" : "focus:ring-blue-400"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="Enter capacity"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.capacity ? "border-red-500" : "focus:ring-blue-400"
            }`}
            min="0"
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid()} 
          className={`w-full py-2 rounded-md ${
            isFormValid()
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Create Inventory
        </button>
      </form>
    </div>
  );
};

export default CreateInventory;
