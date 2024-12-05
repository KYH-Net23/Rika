import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState({
        date: "",
        customerId: "",
        orderId: "",
        dueDate: "",
        paidDate: "",
        amount: "",
        status: "Pending",
    });
    const [error, setError] = useState("");
    const [confirmationPrompt, setConfirmationPrompt] = useState(false);
    const API_BASE_URL = "https://localhost:5160/api/createinvoice";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoice((prev) => ({ ...prev, [name]: value }));
    };

    const isValidInvoice = () => {
        if (!invoice.date || !invoice.dueDate || !invoice.customerId || !invoice.orderId) {
            setError("Date, Due Date, Customer ID, and Order ID cannot be empty.");
            return false;
        }
        if (isNaN(invoice.amount) || invoice.amount <= 0) {
            setError("Amount must be a positive number.");
            return false;
        }
        if (!["Pending", "Paid", "Overdue"].includes(invoice.status)) {
            setError("Status must be one of: Pending, Paid, Overdue.");
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!confirmationPrompt) {
            setConfirmationPrompt("save");
            return;
        }

        if (!isValidInvoice()) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/createinvoice`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(invoice),
            });
            if (!response.ok) {
                throw new Error("Failed to create invoice.");
            }

            navigate("/all-invoices");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCancel = () => {
        if (!confirmationPrompt) {
            setConfirmationPrompt("cancel");
            return;
        }
        navigate("/all-invoices");
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
            <form className="space-y-4">
                <label>
                    <span>Date:</span>
                    <input
                        type="date"
                        name="date"
                        value={invoice.date}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </label>
                <label>
                    <span>Customer ID:</span>
                    <input
                        type="text"
                        name="customerId"
                        value={invoice.customerId}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </label>
                <label>
                    <span>Order ID:</span>
                    <input
                        type="text"
                        name="orderId"
                        value={invoice.orderId}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </label>
                <label>
                    <span>Due Date:</span>
                    <input
                        type="date"
                        name="dueDate"
                        value={invoice.dueDate}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </label>
                <label>
                    <span>Paid Date:</span>
                    <input
                        type="date"
                        name="paidDate"
                        value={invoice.paidDate}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </label>
                <label>
                    <span>Amount:</span>
                    <input
                        type="number"
                        name="amount"
                        value={invoice.amount}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </label>
                <label>
                    <span>Status:</span>
                    <select
                        name="status"
                        value={invoice.status}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Overdue">Overdue</option>
                    </select>
                </label>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Create Invoice
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Cancel
                    </button>
                </div>
                {confirmationPrompt && (
                    <div className="mt-4 bg-yellow-100 p-2 rounded text-yellow-600">
                        Are you sure you want to{" "}
                        {confirmationPrompt === "save" ? "create this invoice" : "cancel"}?
                        <button
                            onClick={() => setConfirmationPrompt(false)}
                            className="bg-blue-500 text-white px-2 py-1 ml-4 rounded hover:bg-blue-600"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setConfirmationPrompt(false)}
                            className="bg-gray-500 text-white px-2 py-1 ml-2 rounded hover:bg-gray-600"
                        >
                            No
                        </button>
                    </div>
                )}
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default CreateInvoice;
