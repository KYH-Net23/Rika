import { useState } from "react";

const ProductReturnPage = () => {
  const mockProducts = [
    {
      id: 1,
      name: "Nike Shoes",
      price: 55,
      orderId: 33333333,
      date: "24-11-18",
    },
    {
      id: 2,
      name: "Nike Shirt",
      price: 45,
      orderId: 33333333,
      date: "24-11-18",
    },
    {
      id: 3,
      name: "Nike Pants",
      price: 60,
      orderId: 33333333,
      date: "24-11-18",
    },
    {
      id: 4,
      name: "Nike Hat",
      price: 30,
      orderId: 33333333,
      date: "24-11-18",
    },
    {
      id: 5,
      name: "Nike Spear",
      price: 30,
      orderId: 33333334,
      date: "24-11-18",
    },
  ];

  const [products] = useState(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [returnReason, setReturnReason] = useState("Damaged/defective item");
  const [resolutionType, setResolutionType] = useState("Refund");
  const [returnId, setReturnId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProductSelection = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product.id));
    }
    setSelectAll(!selectAll);
  };

  const handleReturnReasonChange = (e) => {
    setReturnReason(e.target.value);
  };

  const handleResolutionTypeChange = (e) => {
    setResolutionType(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedProducts.length) {
      alert("Please select at least one product to initiate a return.");
    } else if (!returnReason) {
      alert("Please specify a reason for the return.");
    } else if (!resolutionType) {
      alert("Please select a resolution type: Refund or Exchange.");
    }

    const returnRequest = {
      orderId: products.find((product) => product.id === selectedProducts[0])
        .orderId,
      customerEmail: "user@example.com",
      returnReason: returnReason,
      resolutionType: resolutionType,
      status: "Requested",
      createdAt: new Date().toISOString(),
    };

    console.log("Submitting return request:", returnRequest);

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://returnprovider.azurewebsites.net/api/returns`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(returnRequest),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error submitting return request:", errorMessage);
        alert(`Failed to submit return request: ${errorMessage}`);
        return;
      }

      const data = await response.json();
      console.log("Return request submitted successfully. Response:", data);

      setReturnId(data.returnId);
      alert("Return submitted successfully!");
    } catch (error) {
      console.error("Error while submitting return request:", error);
      alert("An error occurred while submitting the return request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadLabel = async () => {
    if (!returnId) {
      alert("No return label available. Submit a return request first.");
      return;
    }

    try {
      const response = await fetch(
        `https://returnprovider.azurewebsites.net/api/returns/label/${returnId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error fetching return label:", errorMessage);
        alert("Failed to download return label.");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ReturnLabel.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      alert("Return label downloaded successfully!");
    } catch (error) {
      console.error("Error downloading return label:", error);
      alert("An error occurred while downloading the return label.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Create Return</h1>

      <div className="w-full max-w-md">
        <table className="table-auto w-full border-collapse border border-gray-200 rounded-t-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left rounded-tl-lg">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Product
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Date
              </th>
              <th className="border border-gray-200 px-4 py-2 text-right">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-200 px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleProductSelection(product.id)}
                  />
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {product.name}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {new Date(product.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-right">
                  {product.price}kr
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <p className="font-bold">
          Total:{" "}
          {selectedProducts.reduce((total, id) => {
            const product = products.find((p) => p.id === id);
            return total + (product ? product.price : 0);
          }, 0)}{" "}
          kr
        </p>
      </div>

      <div className="w-full max-w-md mt-4">
        <label htmlFor="returnReason" className="block mb-2 font-medium">
          Select a reason for the return:
        </label>
        <select
          id="returnReason"
          className="w-full border border-gray-300 rounded p-2"
          value={returnReason}
          onChange={handleReturnReasonChange}
        >
          <option value="">-- Select Reason --</option>
          <option value="Damaged/defective item">Damaged/Defective Item</option>
          <option value="Did not meet expectations">
            Did Not Meet Expectations
          </option>
          <option value="Incorrect order">Incorrect Order</option>
        </select>
      </div>

      <div className="w-full max-w-md mt-4">
        <label htmlFor="resolutionType" className="block mb-2 font-medium">
          Select a resolution type:
        </label>
        <select
          id="resolutionType"
          className="w-full border border-gray-300 rounded p-2"
          value={resolutionType}
          onChange={handleResolutionTypeChange}
        >
          <option value="">-- Select Resolution --</option>
          <option value="Refund">Refund</option>
          <option value="Exchange">Exchange</option>
        </select>
      </div>

      <div className="w-full max-w-md">
        <button
          disabled={isLoading}
          className={`w-full p-2 rounded mt-4 ${
            isLoading ? "bg-gray-400" : "bg-black text-white hover:bg-gray-800"
          }`}
          onClick={handleSubmit}
        >
          {isLoading ? "Submitting..." : "Confirm Return"}
        </button>
      </div>

      {returnId && (
        <div className="w-full max-w-md mt-4">
          <button
            type="button"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            onClick={handleDownloadLabel}
          >
            Download Return Label
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReturnPage;
