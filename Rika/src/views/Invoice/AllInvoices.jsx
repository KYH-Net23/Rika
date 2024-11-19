import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBack from "../../common/ArrowBack";
import SearchIcon from "../../assets/icons/SearchIcon";

const AllInvoices = () => {
    const [invoices, setInvoices] = useState([]); // Håller alla fakturor
    const [filteredInvoices, setFilteredInvoices] = useState([]); // Filtrerade fakturor för sökning
    const [searchTerm, setSearchTerm] = useState(""); // Sökterm
    const [error, setError] = useState(""); // Felmeddelanden
    const [loading, setLoading] = useState(true); // Laddningsstatus
    const navigate = useNavigate(); // Navigering

    // Hämta fakturor från API
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/getallinvoices");
                if (!response.ok) {
                    throw new Error("Failed to fetch invoices");
                }
                const data = await response.json();
                setInvoices(data);
                setFilteredInvoices(data); // För initial visning
            } catch (err) {
                setError("No invoices found");
            } finally {
                setLoading(false); // Sluta visa laddningsindikator
            }
        };

        fetchInvoices();
    }, []);

    // Hantera sökning
    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setFilteredInvoices(
            invoices.filter(invoice =>
                invoice.customerName.toLowerCase().includes(searchTerm) ||
                invoice.invoiceId.toString().includes(searchTerm)
            )
        );
    };

    // Visa laddningsindikator om data inte har laddats
    if (loading) {
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

            {/* Sökfält */}
            <div className="mb-6 flex justify-center">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search by Invoice ID or Customer name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="px-10 py-2 border border-none rounded-full w-full focus:outline-none focus:ring-1 focus:ring-gray-300 bg-[#F3F4F5]"
                    />
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                </div>
            </div>

            {/* Felmeddelande */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Fakturor */}
            {filteredInvoices.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Invoice ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Customer</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Amount</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice.invoiceId} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-700">{invoice.invoiceId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{invoice.customerName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{invoice.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{invoice.amount} kr</td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => navigate(`/invoices/${invoice.invoiceId}`)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-150"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => navigate(`/edit-invoice/${invoice.invoiceId}`)}
                                             className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                        >
                                            Edit
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600 text-center mt-4">No invoices available</p>
            )}
        </div>
    );
};

export default AllInvoices;
