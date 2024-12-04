import React, { useEffect, useState } from 'react'
import ArrowBack from '../../common/ArrowBack'
import { getAllInventories } from "../../lib/InventoryProvider";

const ReadInventories = () => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading inventories...</p>
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
            className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4"
          >
            <div>
              <h2 className="text-lg font-semibold">{inventory.inventoryName}</h2>
              <p className="text-gray-500">ID: {inventory.id}</p>
              <p className="text-gray-500">Country: {inventory.location.country}</p>
              <p className="text-gray-500">Capacity: {inventory.capacity}</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ReadInventories
