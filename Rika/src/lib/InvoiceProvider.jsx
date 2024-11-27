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
      const response = await fetch("https://bankdbserver.database.windows.net/api/getinvoice");
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
      const response = await fetch(`https://bankdbserver.database.windows.net/api/updateinvoice/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedInvoice),
      });
      if (!response.ok) {
        throw new Error("Failed to update invoice.");
      }
      const updatedData = await response.json();
      setInvoices((prev) =>
        prev.map((invoice) => (invoice.invoiceId === id ? updatedData : invoice))
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
