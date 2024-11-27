import React, {useState} from 'react'
import ArrowBack from '../../common/ArrowBack';
const CreateInventory = () => {
    const [formData, setFormData] = useState({
        id: 0,
        inventoryName: "",
        storeName: "",
        location: "",
        description: "",
        capacity: 0,
      });
      const [successMessage, setSuccessMessage] = useState("");
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        setSuccessMessage("Inventory created successfully!");
        setFormData({
          id: 0,
          inventoryName: "",
          storeName: "",
          location: "",
          description: "",
          capacity: 0,
        }); 
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
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Store Name</label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            onChange={handleInputChange}
            placeholder="Enter store name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        
        <div>
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter location"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="Enter capacity"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            min="0"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Create Inventory
        </button>
      </form>
    </div>
  )
}

export default CreateInventory
