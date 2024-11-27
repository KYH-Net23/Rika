import React from 'react'
import ArrowBack from '../../common/ArrowBack'

const ReadInventories = () => {
    const mockInventories = [
        { id: 1, name: "Inventory A", location: "Stockholm", capacity: 100 },
        { id: 2, name: "Inventory B", location: "Gothenburg", capacity: 50 },
        { id: 3, name: "Inventory C", location: "Malmö", capacity: 75 },
      ];

  return (
    <section className="p-6">
      <nav className="flex justify-between items-center mb-6">
        <ArrowBack goBackTo="/all-inventories" />
      </nav>

      <h1 className="text-2xl font-bold mb-6 text-center">All Inventories</h1>

      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {mockInventories.map((inventory) => (
          <div
            key={inventory.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4"
          >
            <div>
              <h2 className="text-lg font-semibold">{inventory.name}</h2>
              <p className="text-gray-500">Location: {inventory.location}</p>
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
