import { createContext, useContext, useState } from "react";

const InvoiceContext = createContext();

export const useInvoices = () => {
  return useContext(InvoiceContext);
};

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");
  const API_BASE_URL = "https://localhost:5160/api";

  // Fetch All Invoices
  const fetchInvoices = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getallinvoices`);
      if (!response.ok) {
        throw new Error("Failed to fetch invoices.");
      }
      const data = await response.json();
      setInvoices(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch One Invoice by ID
  const fetchInvoiceById = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getoneinvoice/${id}`);
      if (!response.ok) {
        throw new Error(`Invoice with ID ${id} not found.`);
      }
      return await response.json();
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  return (
    <InvoiceContext.Provider
      value={{ invoices, fetchInvoices, fetchInvoiceById, error }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
