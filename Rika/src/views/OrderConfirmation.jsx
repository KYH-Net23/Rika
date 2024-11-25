import React, { useEffect, useState } from "react";
import ArrowBack from "../common/ArrowBack";
import { useOrderContext } from "../lib/OrderProvider";

const OrderConfirmation = () => {
  // localStorage.setItem("OrderId", 10); //REMOVE HARD CODED DATA

  const [order, setOrder] = useState([]);
  const { orderData } = useOrderContext();
  const orderId = localStorage.getItem("OrderId");

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(orderId);
        const data = await orderData(orderId);
        setOrder(data);
        console.log(data)
      } catch { }
    };
    getData();
  }, []);
  return (
    <section className="flex flex-col justify-center items-center gap-6">
      <header className="flex flex-col justify-center items-center">
        <div className="items-start">
          <h1 className="font-mont font-semibold text-5xl">RIKA</h1>
          <p className="font-mont font-semibold">Online Shopping</p>
        </div>
      </header>
      <div className="flex flex-col items-start gap-4">
        <ArrowBack goBackTo={"/Products"} />
        <div className="flex flex-col items-center">
          <h2 className="font-mont font-semibold text-2xl md:text-4xl">Thank you for your purchase!</h2>
          <h3 className="font-mont font-semibold text-gray-500 mb-3">Order number: {order.id}</h3>
          <h3 className="font-mont text-gray-500">An order confirmation has been sent to: {order.receivingEmail}</h3>
        </div>
        <div className="w-full border-t border-[#CCC] my-4" />
      </div>
      <div>
        <table className="table-auto w-full text-left border-collapse mb-3">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Item Total</th>
            </tr>
          </thead>
          <tbody>
            {order.products?.map((product, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : ""
                  }`}
              >
                <td className="px-4 py-2">
                  <h2 className="font-mont font-semibold">{product.model}</h2>
                  <h3 className="font-mont font-normal">{product.brand}</h3>
                  {product.size ? (
                    <h3 className="font-mont font-normal">{product.size}</h3>
                  ) : null}
                </td>
                <td className="px-4 py-2">
                  <h3 className="font-mont font-semibold">
                    {product.amount}
                  </h3>
                </td>
                <td className="px-4 py-2">
                  <h3 className="font-mont font-normal">
                    $
                    {product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </h3>
                </td>
                <td className="px-4 py-2">
                  <h3 className="font-mont font-normal">
                    $
                    {(product.price * product.amount).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                      }
                    )}
                  </h3>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrderConfirmation;
