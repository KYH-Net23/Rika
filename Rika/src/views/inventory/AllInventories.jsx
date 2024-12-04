import React from 'react'
import { useNavigate } from "react-router-dom";
import ArrowBack from '../../common/ArrowBack';

function AllInventories() {
  const navigate = useNavigate();

  return (
    
    <div className="p-6 text-center">
      <nav className="flex justify-between items-center mb-4">
        <div className="flex-none">
          <ArrowBack goBackTo="/admin" /> 
        </div>
      </nav>
      <h1 className="text-2xl font-bold mb-6">Inventory Actions</h1>
      <div className="flex flex-col space-y-4">
        
        <button
        onClick={() => navigate('/create-inventory')} 
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Create Inventory
        </button>
        <button
        onClick={() => navigate('/read-inventories')}
         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Show all inventories
        </button>
        <button
        onClick={() => navigate('/update-inventories')}
        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
          Update Inventory
        </button>
        <button 
        onClick={() => navigate('/delete-inventory')}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
          Delete Inventory
        </button>
      </div>
    </div>
  )
}

export default AllInventories
