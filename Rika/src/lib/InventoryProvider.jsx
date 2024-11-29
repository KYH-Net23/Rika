import React from "react";

const BASE_URL = "https://rika-inventory-api.azurewebsites.net/api";

// Funktion för att hämta alla inventarier
export const getAllInventories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getallinventories`);
    if (!response.ok) throw new Error("Failed to fetch inventories.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching inventories:", error);
    throw error;
  }
};

// Funktion för att hämta ett specifikt inventory
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

// Funktion för att skapa ett nytt inventory
export const createInventory = async (inventoryData) => {
  try {
    const response = await fetch(`${BASE_URL}/createinventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventoryData),
    });
    if (!response.ok) throw new Error("Failed to create inventory.");
    return await response.json();
  } catch (error) {
    console.error("Error creating inventory:", error);
    throw error;
  }
};

// Funktion för att uppdatera ett befintligt inventory
export const updateInventory = async (id, inventoryData) => {
  try {
    const response = await fetch(`${BASE_URL}/updateinventory/${id}`, {
      method: "PUT",
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

// Funktion för att ta bort ett inventory
export const deleteInventory = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/deleteinventory/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete inventory.");
    return await response.json();
  } catch (error) {
    console.error("Error deleting inventory:", error);
    throw error;
  }
};

// React-komponent för framtida användning om nödvändigt
const InventoryProvider = ({ children }) => {
  return <>{children}</>;
};

export default InventoryProvider;
