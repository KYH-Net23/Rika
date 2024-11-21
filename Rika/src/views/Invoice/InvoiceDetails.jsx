import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const InvoiceDetails = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/getoneinvoice/${id}`);
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

    return (
        <div className="container mx-auto px-4 py-6">
            {error && <p className="text-red-500">{error}</p>}
            {invoice ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Invoice Details</h1>
                    <p><strong>Invoice ID:</strong> {invoice.invoiceId}</p>
                    <p><strong>Customer ID:</strong> {invoice.customerId}</p>
                    <p><strong>Order ID:</strong> {invoice.orderId}</p>
                    <p><strong>Date:</strong> {invoice.date}</p>
                    <p><strong>Due Date:</strong> {invoice.dueDate}</p>
                    <p><strong>Status:</strong> {invoice.status}</p>
                    <p><strong>Total:</strong> {invoice.amount} kr</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default InvoiceDetails;
