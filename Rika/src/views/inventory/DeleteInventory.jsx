import React, { useState } from 'react'
import ArrowBack from '../../common/ArrowBack'
import { getInventoryById, deleteInventory } from "../../lib/InventoryProvider";

const DeleteInventory = () => {
    const [inventoryId, setInventoryId] = useState('');
    const [inventory, setInventory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        setInventoryId(e.target.value);
      };
    
      const handleFetchInventory = async () => {
        if (!inventoryId) {
          setError('Please enter an inventory ID.');
          return;
        }
    
        setLoading(true);
        setError('');
        setSuccess('');
        try {
          const data = await getInventoryById(inventoryId);
          setInventory(data);
        } catch (err) {
          setError('Failed to fetch inventory. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

    const handleDelete = async () => {
        if (!inventory) {
            setError('Please fetch the inventory first by entering a valid ID.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');
        try {
          await deleteInventory(inventoryId);
          setSuccess('Inventory deleted successfully!');
          setInventory(null);
        } catch (err) {
          setError('Failed to delete inventory. Please try again later.');
        } finally {
          setLoading(false);
        }
    };

    return (
        <section className="p-6">
        <nav className="flex justify-between items-center mb-6">
          <ArrowBack goBackTo="/all-inventories" />
        </nav>
  
        <h1 className="text-2xl font-bold mb-6 text-center">Delete Inventory by ID</h1>
  
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            value={inventoryId}
            onChange={handleInputChange}
            placeholder="Enter inventory ID"
            className="p-2 border border-gray-300 rounded mb-4 w-full"
          />
          <button
            onClick={handleFetchInventory}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Fetch Inventory'}
          </button>
  
          {error && <p className="text-red-500 mt-4">{error}</p>}
  
          {inventory && (
            <div className="mt-6 p-4 border border-gray-300 rounded-md">
              <h2 className="text-xl font-semibold">{inventory.inventoryName}</h2>
              <p><strong>ID:</strong> {inventory.id}</p>
              <p><strong>Location:</strong> {inventory.location.country}</p>
              <p><strong>Capacity:</strong> {inventory.capacity}</p>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600"
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete Inventory'}
              </button>
            </div>
          )}
  
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </div>
      </section>
    );
};

export default DeleteInventory;