import React, { createContext, useContext, useState } from "react";

const InvoiceContext = createContext();

export const useInvoices = () => {
  return useContext(InvoiceContext);
};

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");

  const fetchInvoices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getallinvoices");
      if (!response.ok) {
        throw new Error("Failed to fetch invoices.");
      }
      const data = await response.json();
      setInvoices(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateInvoice = async (id, updatedInvoice) => {
    try {
      const response = await fetch(`http://localhost:5000/api/updateinvoice/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInvoice),
      });
      if (!response.ok) {
        throw new Error("Failed to update invoice.");
      }
      const updatedData = await response.json();
      setInvoices((prev) =>
        prev.map((invoice) => (invoice.id === id ? updatedData : invoice))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <InvoiceContext.Provider value={{ invoices, fetchInvoices, updateInvoice, error }}>
      {children}
    </InvoiceContext.Provider>
  );
};
