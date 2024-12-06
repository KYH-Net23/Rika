import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const DeleteInvoice = () => {
  const { id } = useParams(); // Hämta faktura-ID från URL:en
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [confirmationPrompt, setConfirmationPrompt] = useState(false);
  const API_BASE_URL = "https://localhost:5160/api/deleteinvoice";

  const handleDelete = async () => {
    if (!confirmationPrompt) {
      setConfirmationPrompt(true); // Visa prompt först
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete invoice with ID ${id}.`);
      }

      // Navigera tillbaka till fakturalistan efter lyckad radering
      navigate("/all-invoices");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setConfirmationPrompt(false);
    navigate("/all-invoices"); // Gå tillbaka till fakturalistan utan att radera
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Delete Invoice</h1>
      {error && <p className="text-red-500">{error}</p>}
      {!confirmationPrompt ? (
        <div className="space-y-4">
          <p>Are you sure you want to delete this invoice?</p>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="bg-yellow-100 p-4 rounded text-yellow-700">
          Are you absolutely sure? This action cannot be undone.
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setConfirmationPrompt(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              No, Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteInvoice;
