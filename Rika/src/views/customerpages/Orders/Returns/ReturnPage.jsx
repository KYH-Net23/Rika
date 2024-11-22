import { useState } from "react";

const ProductReturnPage = () => {
  const mockProducts = [
    {
      id: 1,
      name: "Nike Shoes",
      price: 55,
      orderId: "33333333-3333-3333-3333-333333333333",
      date: "24-11-18",
    },
    {
      id: 2,
      name: "Nike Shirt",
      price: 45,
      orderId: "33333333-3333-3333-3333-333333333333",
      date: "24-11-18",
    },
    {
      id: 3,
      name: "Nike Pants",
      price: 60,
      orderId: "33333333-3333-3333-3333-333333333333",
      date: "24-11-18",
    },
    {
      id: 4,
      name: "Nike Hat",
      price: 30,
      orderId: "33333333-3333-3333-3333-333333333333",
      date: "24-11-18",
    },
    {
      id: 5,
      name: "Nike Spear",
      price: 30,
      orderId: "33333333-3333-3333-3333-333333333333",
      date: "24-11-18",
    },
  ];

  const [products] = useState(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [returnReason, setReturnReason] = useState("");
  const [resolutionType, setResolutionType] = useState("");
  const [returnId, setReturnId] = useState(null);

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
      alert("Please select at least one product to return.");
      return;
    }

    if (!returnReason) {
      alert("Please select a reason for the return.");
      return;
    }

    if (!resolutionType) {
      alert("Please select a resolution type (Refund or Exchange).");
      return;
    }

    const returnRequest = {
      orderId: products.find((product) => product.id === selectedProducts[0])
        .orderId,
      userId: "11111111-1111-1111-1111-111111111111",
      returnReason: returnReason,
      resolutionType: resolutionType,
    };

    console.log("Submitting return request:", returnRequest);

    try {
      const response = await fetch(
        `https://localhost:44379/api/returns/submit`,
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
      console.log("Updated returnId state:", data.returnId);
      alert("Return submitted successfully!");
    } catch (error) {
      console.error("Error while submitting return request:", error);
      alert("An error occurred while submitting the return request.");
    }
  };

  const handleDownloadLabel = async () => {
    if (!returnId) {
      alert("No return label available. Submit a return request first.");
      return;
    }

    console.log("Initiating label download for Return ID:", returnId);

    try {
      const response = await fetch(
        `https://localhost:44379/api/returns/label/${returnId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      console.log("API Response Status:", response.status);

      if (!response.ok) {
        console.error("Failed to fetch the return label:", response.statusText);
        alert("Failed to download return label. Please try again.");
        return;
      }

      const blob = await response.blob();
      console.log("Blob received:", blob);

      const url = window.URL.createObjectURL(blob);
      console.log("Generated URL for download:", url);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ReturnLabel.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("Return label downloaded successfully.");
    } catch (error) {
      console.error("Error while downloading return label:", error);
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
                  {product.date}
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
        <p>
          Total:{" "}
          {selectedProducts.reduce((total, id) => {
            const product = products.find((p) => p.id === id);
            return total + (product ? product.price : 0);
          }, 0)}
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
          type="button"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
          onClick={handleSubmit}
        >
          Confirm Return
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
