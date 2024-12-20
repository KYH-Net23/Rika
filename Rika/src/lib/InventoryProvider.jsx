import React from "react";

const BASE_URL = "https://rika-inventory-api.azurewebsites.net/api";

// GET ALL
export const getAllInventories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getinventories`);
    if (!response.ok) throw new Error("Failed to fetch inventories.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching inventories:", error);
    throw error;
  }
};

// GET ONE
export const getInventoryById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/getinventory/${id}`);
    if (!response.ok) throw new Error("Failed to fetch inventory.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

// CREATE
export const createInventory = async (inventoryData) => {
  try {
    const response = await fetch(`${BASE_URL}/createinventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventoryData),
    });

  if (!response.ok) {
    const errorText = await response.text();  
    console.error("Server responded with error:", errorText);
    throw new Error(`Failed to create inventory. Server responded with: ${errorText}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json(); 
    console.log("Inventory created:", data);
    return data;
  } else {
    const responseText = await response.text();
    console.error("Non-JSON response:", responseText);
    throw new Error("Server did not return valid JSON.");
  }
  } catch (error) {
    console.error("Error creating inventory:", error);
    throw error;
  }
};

// UPDATE
export const updateInventory = async (id, inventoryData) => {
  try {
    const response = await fetch(`${BASE_URL}/updateinventory/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventoryData),
    });
    if (!response.ok) throw new Error("Failed to update inventory.");
    return await response.json();
  } catch (error) {
    console.error("Error updating inventory:", error);
    throw error;
  }
};

// DELETE
export const deleteInventory = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteinventory/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete inventory.");
    }

    if (response.status !== 204) { 
      return await response.json();
    } else {
      return { message: "Inventory deleted successfully", success: true };
    }

  } catch (error) {
    console.error("Error deleting inventory:", error);
    throw error;
  }
};

const InventoryProvider = ({ children }) => {
  return <>{children}</>;
};

export default InventoryProvider;
