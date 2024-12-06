import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");
  const API_BASE_URL = "https://localhost:5160/api/getoneinvoice";

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getoneinvoice/${id}`);
        if (!response.ok) {
          throw new Error(`Invoice with ID ${id} not found.`);
        }
        const data = await response.json();
        setInvoice(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchInvoice();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!invoice) {
    return <div>Loading invoice details...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Invoice Details</h1>
      <p>
        <strong>Invoice ID:</strong> {invoice.invoiceId}
      </p>
      <p>
        <strong>Customer ID:</strong> {invoice.customerId}
      </p>
      <p>
        <strong>Order ID:</strong> {invoice.orderId}
      </p>
      <p>
        <strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {new Date(invoice.dueDate).toLocaleDateString()}
      </p>
      <p>
        <strong>Status:</strong> {invoice.status}
      </p>
      <p>
        <strong>Total:</strong> {invoice.amount} kr
      </p>
    </div>
  );
};

export default InvoiceDetails;
