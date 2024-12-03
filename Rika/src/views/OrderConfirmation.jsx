import { useEffect, useState, useRef } from "react";
import ArrowBack from "../common/ArrowBack";
import { useOrderContext } from "../lib/OrderProvider";
import { usePaymentContext } from "../lib/PaymentProvider";

const OrderConfirmation = () => {
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
      } catch {}
    };
    getData();
    fetchSessionStatus(stripeSessionId);
    ["cartItems", "customerInfo", "shippingInformation"].forEach((key) => localStorage.removeItem(key));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <div
          className="inline-block w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"
          role="status"
        ></div>
        <span className="ml-3 text-black">Preparing your email...</span>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <span className="ml-3 text-black">
          Something went wrong, refresh the page. Contact our support if that
          does not fix it.
        </span>
      </div>
    );
  }
  if (status === "complete" || status === "alreadySent") {
    return (
      <section className="flex flex-col justify-center items-center gap-6">
        <div className="max-w-[375px] px-4 md:max-w-full">
          <header className="flex flex-col justify-center items-center">
            <div className="items-start">
              <h1 className="font-mont font-semibold text-5xl">RIKA</h1>
              <p className="font-mont font-semibold">Online Shopping</p>
            </div>
          </header>
          <div className="flex flex-col items-start gap-4">
            <ArrowBack goBackTo={"/Products"} />
            <div className="flex flex-col items-center">
              <h2 className="font-mont font-semibold text-lg md:text-4xl">
                Thank you for your purchase!
              </h2>
              <h3 className="font-mont font-semibold text-gray-500 mb-3 text-sm md:text-base">
                Order number: {order.id}
              </h3>
              <h3 className="font-mont text-gray-500 text-center text-sm md:text-base">
                An order confirmation has been sent to: {order.receivingEmail}
              </h3>
            </div>
            <div className="w-full border-t border-[#CCC] my-4" />
          </div>
          <div className="w-full">
            <table className="table-auto text-left border-collapse mb-3 md:w-full">
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
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="px-1 py-2 md:px-4">
                      <h2 className="font-mont font-semibold">
                        {product.model}
                      </h2>
                      <h3 className="font-mont font-normal">{product.brand}</h3>
                      {product.size ? (
                        <h3 className="font-mont font-normal">
                          {product.size}
                        </h3>
                      ) : null}
                    </td>
                    <td className="px-1 py-2 md:px-4">
                      <h3 className="font-mont font-semibold">
                        {product.amount}
                      </h3>
                    </td>
                    <td className="px-1 py-2 md:px-4">
                      <h3 className="font-mont font-normal">
                        $
                        {product.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </h3>
                    </td>
                    <td className="px-1 py-2 md:px-4">
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
            <div className="flex flex-col items-end">
              <h3 className="font-mont font-semibold">
                Subtotal: $
                {order.products
                  ?.reduce(
                    (total, product) => total + product.price * product.amount,
                    0
                  )
                  .toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </h3>
              <h3 className="font-mont font-normal">
                VAT: $
                {order.products
                  ?.reduce(
                    (total, product) =>
                      total + product.price * product.amount * 0.25,
                    0
                  )
                  .toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </h3>
              <div className="flex flex-col">
                {order.shipping && order.shipping?.shippingCost && (
                  <h3 className="font-mont">
                    Shipping: $
                    {order.shipping?.shippingCost.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </h3>
                )}
              </div>
            </div>
            <div className="w-full border-t border-[#CCC] my-4" />
            <div className="flex justify-end">
              <h2 className="font-mont font-semibold text-xl">
                Grand Total: $
                {(
                  order.products?.reduce(
                    (total, product) => total + product.price * product.amount,
                    0
                  ) +
                  order.products?.reduce(
                    (total, product) =>
                      total + product.price * product.amount * 0.25,
                    0
                  ) +
                  (order.shipping?.shippingCost || 0)
                ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <div className="w-full border-t border-[#CCC] my-4" />
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col">
              <div className="mb-3">
                <h2 className="font-mont font-semibold text-lg">
                  Delivery Information
                </h2>
                {order.shipping?.postalAgentDeliveryInformation.postalCode &&
                  order.shipping?.postalAgentDeliveryInformation.city && (
                    <h3 className="font-mont">
                      Estimated delivery date: {order.shipping?.orderArrival}
                    </h3>
                  )}
                {order.shipping?.postalAgentDeliveryInformation && (
                  <div className="flex flex-col">
                    {order.shipping?.postalAgentDeliveryInformation
                      .postalAgentName && (
                      <h3 className="font-mont">
                        Delivery to:{" "}
                        {
                          order.shipping?.postalAgentDeliveryInformation
                            .postalAgentName
                        }
                      </h3>
                    )}
                    {order.shipping?.postalAgentDeliveryInformation
                      .streetAddress && (
                      <h3 className="font-mont">
                        {
                          order.shipping?.postalAgentDeliveryInformation
                            .streetAddress
                        }
                      </h3>
                    )}
                    {order.shipping?.postalAgentDeliveryInformation.postalCode &&
                      order.shipping?.postalAgentDeliveryInformation.city && (
                        <h3 className="font-mont">
                          {
                            order.shipping?.postalAgentDeliveryInformation
                              .postalCode
                          }{" "}
                          {order.shipping?.postalAgentDeliveryInformation.city}
                        </h3>
                      )}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <h2 className="font-mont font-semibold text-lg">
                  Payment Information
                </h2>
                <h3 className="font-mont">
                  Payment method: {order.invoice?.paymentOption}
                </h3>
                <h3 className="font-mont">Status: {order.status}</h3>
              </div>
            </div>
            <div className="md:h-52 w-[1px] bg-[#CCC] mx-4" />
            <div className="mb-3">
              <h2 className="font-mont font-semibold text-lg">
                Customer Information
              </h2>
              {order.shipping?.customerDeliveryInformation ? (
                <>
                  <h3 className="font-mont">
                    {order.shipping?.customerDeliveryInformation.fullName}
                  </h3>
                  <h3 className="font-mont">
                    {order.shipping?.customerDeliveryInformation.streetAddress}
                  </h3>
                  <h3 className="font-mont">
                    {order.shipping?.customerDeliveryInformation.postalCode}{" "}
                    {order.shipping?.customerDeliveryInformation.city}
                  </h3>
                  <h3 className="font-mont">{order.receivingEmail}</h3>
                  <h3 className="font-mont">
                    {order.shipping?.customerDeliveryInformation.phoneNumber}
                  </h3>
                </>
              ) : (
                <p>Loading customer information...</p>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default OrderConfirmation;
