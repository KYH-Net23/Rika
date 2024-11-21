import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditInvoice = () => {
  const { id } = useParams(); // Get the invoice ID from the route
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmationPrompt, setConfirmationPrompt] = useState(false);

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
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!confirmationPrompt) {
      setConfirmationPrompt("save");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/updateinvoice/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice),
      });
      if (!response.ok) {
        throw new Error("Failed to update invoice.");
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Edit Invoice</h1>
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
            Save
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
            Are you sure you want to {confirmationPrompt === "save" ? "save changes" : "cancel"}?
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
    </div>
  );
};

export default EditInvoice;
