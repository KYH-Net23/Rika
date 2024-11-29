import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { getInventoryById, updateInventory } from '../../lib/InventoryProvider';
import ArrowBack from '../../common/ArrowBack';

const UpdateInventories = () => {
    const { id } = useParams(); // Hämta ID från URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: 0,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Hämta inventariedata från API vid första renderingen
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getInventoryById(id);
        setFormData({
          name: data.name,
          location: data.location,
          capacity: data.capacity,
        });
      } catch (err) {
        setError("Failed to load inventory data.");
      }
    };

    fetchInventory();
  }, [id]);

  // Hantera inputändringar
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hantera formulärsubmits
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInventory(id, formData);
      setSuccess(true);
      setTimeout(() => navigate("/all-inventories"), 2000); // Navigera tillbaka efter 2 sekunder
    } catch (err) {
      setError("Failed to update inventory.");
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }
  return (
    <div className="p-6">
      <nav>
        <ArrowBack goBackTo="/all-inventories" />
      </nav>
      <h1 className="text-2xl font-bold mb-6 text-center">Update Inventory</h1>

      {success && (
        <div className="text-green-500 text-center mb-4">
          Inventory updated successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        {/* Inventory Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Inventory Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Update Inventory
        </button>
      </form>
    </div>
  )
}

export default UpdateInventories
