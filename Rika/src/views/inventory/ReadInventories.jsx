import React, { useEffect, useState } from 'react'
import ArrowBack from '../../common/ArrowBack'
import { getAllInventories } from "../../lib/InventoryProvider";

const ReadInventories = () => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const data = await getAllInventories();
        setInventories(data);
      } catch (error) {
        setError('Failed to load inventories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, []);

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-semibold mt-4">Fetching inventories...</p>
          <p className="text-sm text-gray-500">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="p-6">
      <nav className="flex justify-between items-center mb-6">
        <ArrowBack goBackTo="/all-inventories" />
      </nav>

      <h1 className="text-2xl font-bold mb-6 text-center">All Inventories</h1>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {inventories.map((inventory) => (
          <div
            key={inventory.id}
            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-start"
          >
            <div>
              <h2 className="text-lg font-semibold">{inventory.inventoryName}</h2>
              <p className="text-gray-500">ID: {inventory.id}</p>
              <p className="text-gray-500">Store Name: {inventory.storeName}</p>
              <p className="text-gray-500">Capacity: {inventory.capacity}</p>
              <p className="text-gray-500">Country: {inventory.location.country}</p>

              {expandedId === inventory.id && (
                <>
                  <p className="text-gray-500">City: {inventory.location.city}</p>
                  <p className="text-gray-500">Street Address: {inventory.location.streetAddress}</p>
                  <p className="text-gray-500">ZipCode: {inventory.location.zipCode}</p>
                  <p className="text-gray-500">Active: {inventory.isActive ? 'Yes' : 'No'}</p>
                  <p className="text-gray-500">Created: {inventory.createdDate}</p>
                  <p className="text-gray-500">Updated: {inventory.lastUpdatedDate}</p>
                  </>
              )}
            </div>

            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => toggleDetails(inventory.id)}
              >
                {expandedId === inventory.id ? 'Hide Details' : 'View Details'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReadInventories
