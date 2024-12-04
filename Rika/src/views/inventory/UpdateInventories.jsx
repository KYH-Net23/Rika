import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { getInventoryById, updateInventory } from '../../lib/InventoryProvider';
import ArrowBack from '../../common/ArrowBack';

const UpdateInventories = () => {
  const { id } = useParams(); // Hämta ID från URL
  const navigate = useNavigate();

  const [idInput, setIdInput] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    inventoryName: "",
    storeName: "",
    location: {
      country: "",
      city: "",
      streetAddress: "",
      zipCode: "",
    },
    description: "",
    capacity: 0,
    isActive: true,
    createdDate: "",
    lastUpdatedDate: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputId = (e) => {
    setIdInput(e.target.value);
  };

  // Hämta inventariedata från API vid första renderingen
    const fetchInventory = async () => {
      if (idInput) {
        try {
          const data = await getInventoryById(idInput);
          setFormData({
            id: data.id,
            inventoryName: data.inventoryName,
            storeName: data.storeName,
            location: {
              country: data.location.country,
              city: data.location.city,
              streetAddress: data.location.streetAddress,
              zipCode: data.location.zipCode
            },
            description: data.description || "Default description",
            capacity: data.capacity,
            isActive: data.isActive,
            createdDate: data.createdDate,
            lastUpdatedDate: new Date().toISOString().split("T")[0]
          });
          setError(null);
        } catch (err) {
          setError("Failed to load inventory data.");
        }
      } else {
        setError("Please enter a valid ID.");
      }
    };

  // Hantera inputändringar
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked, // If the input is a checkbox, update with 'checked' value
      });

    } else if (name.startsWith("location.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [field]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Hantera formulärsubmits
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedInventory = {
      ...formData,
      lastUpdatedDate: new Date().toISOString().split("T")[0],
    };

    try {
      await updateInventory(formData.id, updatedInventory);
      setSuccess(true);

      setTimeout(() => navigate("/all-inventories"), 5000);
    } catch (err) {
      setError("Failed to update inventory.");
    }
  };

  const handleCancel = () => {
    navigate("/all-inventories");
  };

  return (
    <div className="p-6">
      <nav>
        <ArrowBack goBackTo="/all-inventories" />
      </nav>
      <h1 className="text-2xl font-bold mb-6 text-center">Update Inventory</h1>

      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
        
        {/* Non editable ID */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Inventory ID</label>
          <input
            type="text"
            value={idInput}
            onChange={handleInputId}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter Inventory ID"
          />
        </div>

          {/* Button to fetch inventory data */}
          <button
            onClick={fetchInventory}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Fetch Inventory
          </button>

            {/* Inventory ID */}
            {formData.id && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Inventory ID</label>
                <input
                  type="text"
                  value={formData.id}
                  disabled
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

            {/* Inventory Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Inventory Name
              </label>
              <input
                type="text"
                name="inventoryName"
                value={formData.inventoryName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Store Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location.country}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">City</label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Street Address</label>
              <input
                type="text"
                name="location.streetAddress"
                value={formData.location.streetAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Zip Code</label>
              <input
                type="text"
                name="location.zipCode"
                value={formData.location.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Capacity</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                required
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                min="0"
                required
              />
            </div>

            {/* IsActive */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Is Active</label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="w-4 h-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Created date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Created</label>
              <input
                type="text"
                value={formData.createdDate}
                disabled
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Last updated */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Updated</label>
              <input
                type="text"
                value={formData.lastUpdatedDate}
                disabled
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex justify-between space-x-2">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-500 text-center mb-4">
          Inventory updated successfully!
        </div>
      )}
      
    </div>
  );
};

export default UpdateInventories;
