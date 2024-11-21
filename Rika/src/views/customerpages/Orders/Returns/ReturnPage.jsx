import { useState } from "react";

const ProductReturnPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [returnReason, setReturnReason] = useState("");

  const products = [
    { id: 1, name: "Nike Shoes", price: 55, date: "24-11-18" },
    { id: 2, name: "Nike Shirt", price: 45, date: "24-11-18" },
    { id: 3, name: "Nike Pants", price: 60, date: "24-11-18" },
    { id: 4, name: "Nike Hat", price: 30, date: "24-11-18" },
  ];

  const handleProductSelection = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]); // Uncheck all
    } else {
      setSelectedProducts(products.map((product) => product.id)); // Check all
    }
    setSelectAll(!selectAll);
  };

  const handleReturnReasonChange = (e) => {
    setReturnReason(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedProducts.length) {
      alert("Please select at least one product to return.");
      return;
    }

    if (!returnReason) {
      alert("Please select a reason for the return.");
      return;
    }

    // Submit logic here
    console.log("Selected Products:", selectedProducts);
    console.log("Return Reason:", returnReason);
    alert("Return submitted successfully!");
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

      <div className="w-full max-w-md">
        <button
          type="button"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
          onClick={handleSubmit}
        >
          Confirm Return
        </button>
      </div>
    </div>
  );
};

export default ProductReturnPage;
