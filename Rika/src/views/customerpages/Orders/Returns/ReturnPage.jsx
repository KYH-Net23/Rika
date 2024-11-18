//get order details from DB
//order ID
//Description

//our API can either do two PUT to change ORder DB and Invoice DB or make anouter table for Return to save the history in Order DB
//Foreign Key from orderDB linked to Retourn DB
//DB structure, see Milles paint document.

//import OrderDetails from orderProvider wich is ShippingContext, PaymentContext and CartContext dislpayed as order Details
import { useNavigate } from "react-router-dom";
// import ArrowBack from "../../common/ArrowBack";
import { useState } from "react";

const ProductReturnPage = () => {
  const products = [
    { id: 1, name: "nike shoes", price: 55, date: 241118 },
    { id: 2, name: "nike shirt", price: 55, date: 241118 },
    { id: 3, name: "nike pants", price: 55, date: 241118 },
    { id: 4, name: "nike hat", price: 55, date: 241118 },
  ];

  return (
    <div className="flex flex-col items-center jusstify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Create Return</h1>
      <div className="w-full max-w-md ">
        <table className="table-auto w-full border-collapse border border-gray-200 rounded-t-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left rounded-tl-lg">
                <input type="checkbox" />
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
                  <input type="checkbox" />
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

      <div class>
        <p>Total: 589kr </p>
      </div>

      <div className="w-full max-w-md">
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 mt-4"
        >
          confirm return
        </button>
      </div>
    </div>
  );
};

export default ProductReturnPage;
