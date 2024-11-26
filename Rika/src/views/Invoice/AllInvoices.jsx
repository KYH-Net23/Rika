import React, { useEffect, useState } from "react";
import { useInvoices } from "../../lib/InvoiceProvider";
import { useNavigate } from "react-router-dom";
import ArrowBack from "../../common/ArrowBack";
import SearchIcon from "../../assets/icons/SearchIcon";

const AllInvoices = () => {
  const { invoices, fetchInvoices, error } = useInvoices(); // Invoice data
  const navigate = useNavigate(); // Navigation
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [searchFilter, setSearchFilter] = useState("invoiceId"); // Filter option
  const [filteredInvoices, setFilteredInvoices] = useState([]); // Filtered invoices
  const [currentPage, setCurrentPage] = useState(1); // Pagination current page
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    fetchInvoices(); // Fetch invoices when component mounts
  }, [fetchInvoices]);

  useEffect(() => {
    // Filter invoices based on search term and filter type
    setFilteredInvoices(() => {
      if (!searchTerm) return invoices;
      return invoices.filter((invoice) => {
        const value = invoice[searchFilter]?.toString().toLowerCase();
        return value && value.includes(searchTerm.toLowerCase());
      });
    });
  }, [searchTerm, searchFilter, invoices]);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    if (!searchTerm) return; // Show all invoices if search is empty

    // Check if search matches an invoice ID and redirect to detail page
    const matchingInvoice = invoices.find(
      (invoice) =>
        searchFilter === "invoiceId" && invoice.invoiceId.toString() === searchTerm
    );

    if (matchingInvoice) {
      navigate(`/invoices/${matchingInvoice.invoiceId}`);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchFilter("invoiceId");
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!invoices.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-mont text-[16px] font-semibold">Loading invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ArrowBack goBackTo="/admin" className="mb-4" />
      <h1 className="text-3xl font-bold text-center mb-6">All Invoices</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex flex-col items-center gap-4">
        <div className="flex gap-4 items-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder={`Search by ${searchFilter}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-10 py-2 border rounded-full w-full focus:outline-none focus:ring-1 focus:ring-gray-300 bg-[#F3F4F5]"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
          </div>
          <select
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none"
          >
            <option value="invoiceId">Invoice ID</option>
            <option value="customerId">Customer ID</option>
            <option value="orderId">Order ID</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Invoice Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Invoice ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Customer ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedInvoices.map((invoice) => (
              <tr key={invoice.invoiceId} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{invoice.invoiceId}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{invoice.customerId}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{invoice.orderId}</td>
                <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{invoice.amount} kr</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => navigate(`/invoices/${invoice.invoiceId}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-gray-500 text-white hover:bg-gray-600"
          }`}
        >
          Previous
        </button>
        <p className="text-gray-700">Page {currentPage}</p>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= filteredInvoices.length}
          className={`px-4 py-2 rounded-md ${
            currentPage * itemsPerPage >= filteredInvoices.length
              ? "bg-gray-300 text-gray-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllInvoices;
