import { useEffect, useState, useContext } from "react";
import { useInvoices } from "../../lib/InvoiceProvider";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../lib/AuthProvider"; // UserContext импортлох

const AllInvoices = () => {
  const { invoices, fetchInvoices, error } = useInvoices();
  const { userRole } = useContext(UserContext); // UserContext-оос userRole авах
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredInvoices(invoices);
    } else {
      setFilteredInvoices(
        invoices.filter((invoice) =>
          invoice.invoiceId.toString().includes(searchTerm)
        )
      );
    }
  }, [searchTerm, invoices]);

  // userRole-ийг шалгах useEffect нэмэх
  useEffect(() => {
    console.log("Current User Role:", userRole); // Консолд userRole-ийг хэвлэх
  }, [userRole]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilteredInvoices(
      invoices.filter((invoice) =>
        invoice.invoiceId.toString().includes(searchTerm)
      )
    );
  };

  if (!invoices.length) {
    return <div>Loading invoices...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Invoices</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search by Invoice ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Customer ID</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice.invoiceId}>
              <td>{invoice.invoiceId}</td>
              <td>{invoice.customerId}</td>
              <td>{invoice.orderId}</td>
              <td>{invoice.amount} kr</td>
              <td>{invoice.status}</td>
              <td>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => navigate(`/invoices/${invoice.invoiceId}`)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllInvoices;
