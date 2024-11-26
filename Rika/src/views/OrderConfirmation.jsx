import React, { useEffect, useState, useRef } from "react";
import ArrowBack from "../common/ArrowBack";
import { useOrderContext } from "../lib/OrderProvider";
import { usePaymentContext } from "../lib/PaymentProvider";


const OrderConfirmation = () => {
  // localStorage.setItem("OrderId", 10); //REMOVE HARD CODED DATA

  const [order, setOrder] = useState([]);
  const { orderData } = useOrderContext();
  const orderId = localStorage.getItem("OrderId");
  const stripeSessionId = localStorage.getItem("StripeSessionId");
  const { fetchSessionStatus, loading, status } = usePaymentContext();
  const hasFetched = useRef(false);


  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;
    const getData = async () => {
      try {
        const data = await orderData(orderId);
        setOrder(data);
      } catch { }
    };
    getData();
    fetchSessionStatus(stripeSessionId);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <div className="inline-block w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" role="status"></div>
        <span className="ml-3 text-black">Preparing your email...</span>
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <span className="ml-3 text-black">Something went wrong, refresh the page. Contact our support if that does not fix it.</span>
      </div>
    );
  }
  if (status === 'complete' || status === 'alreadySent') {

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
  }
};

export default OrderConfirmation;
