import { useEffect, useState } from "react";
import ArrowBack from "../../../../common/ArrowBack";

const OrderSummary = ({ slideNumber, clickNextFunc, clickPrevFunc }) => {
  const [cartData, setCartData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState([{ paymentType: "Stripe" }]);

  const fetchLocalStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    const customerInfo = JSON.parse(localStorage.getItem("customerInfo"));
    const shippingInfo = JSON.parse(
      localStorage.getItem("shippingInformation")
    );

    setCartData(cartItems);
    setCustomerData(customerInfo);
    setShippingData(shippingInfo);
  };

  useEffect(() => {
    fetchLocalStorage();
  }, []);

  console.log();
  return (
    <>
      <ArrowBack clickFunc={clickPrevFunc} />
      <section className="flex flex-col min-w-[355px] md:min-w-[562px]">
        <h3 className="font-mont font-semibold">
          <span className="bg-[#CCC] py-1 px-[10px] rounded-full mr-2">
            {slideNumber}
          </span>
          Order Summary
        </h3>
        <div className="flex flex-col items-end gap-0">
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
              {cartData.map((product, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="px-4 py-2">
                    <h2 className="font-mont font-semibold">{product.brand}</h2>
                    <h3 className="font-mont font-normal">{product.model}</h3>
                    {product.size ? (
                      <h3 className="font-mont font-normal">{product.size}</h3>
                    ) : null}
                  </td>
                  <td className="px-4 py-2">
                    <h3 className="font-mont font-semibold">
                      {product.quantity}
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
                      {(product.price * product.quantity).toLocaleString(
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
              {cartData
                .reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
                .toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </h3>
            <h3 className="font-mont font-normal">
              VAT: $
              {cartData
                .reduce(
                  (total, product) =>
                    total + product.price * product.quantity * 0.25,
                  0
                )
                .toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </h3>
            <div className="flex flex-col">
              <div className="flex gap-1">
                {shippingData &&
                  shippingData.deliveryOption.serviceInformation.name && (
                    <h3 className="font-mont">
                      {shippingData.deliveryOption.serviceInformation.name}:
                    </h3>
                  )}
                {shippingData && shippingData.deliveryOption.price && (
                  <h3 className="font-mont">
                    $
                    {shippingData.deliveryOption.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </h3>
                )}
              </div>
            </div>
          </div>
          <div className="w-full border-t border-[#CCC] my-4" />
          <h2 className="font-mont font-semibold text-xl">
            Grand Total: $
            {(
              cartData.reduce(
                (total, product) => total + product.price * product.quantity,
                0
              ) +
              cartData.reduce(
                (total, product) =>
                  total + product.price * product.quantity * 0.25,
                0
              ) +
              (shippingData?.deliveryOption.price || 0)
            ).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </h2>
        </div>
        <div className="w-full border-t border-[#CCC] my-4" />
        <div className="mb-3">
          <h2 className="font-mont font-semibold text-lg">
            Customer Information
          </h2>
          <h3 className="font-mont">
            {customerData.firstName} {customerData.lastName}
          </h3>
          <h3 className="font-mont">{customerData.streetAddress}</h3>
          <h3 className="font-mont">
            {customerData.zipCode} {customerData.city}
          </h3>
          <h3 className="font-mont">{customerData.email}</h3>
          <h3 className="font-mont">{customerData.telephone}</h3>
        </div>
        <div className="mb-3">
          <h2 className="font-mont font-semibold text-lg">
            Shipping Information
          </h2>
          {shippingData && shippingData.servicePoint.name && (
            <div className="flex flex-col">
              <h3 className="font-mont">
                {shippingData.deliveryOption.serviceInformation.name}
              </h3>
              <h3 className="font-mont">
                Delivery to: {shippingData.servicePoint.name}
              </h3>
              <h3 className="font-mont">
                {shippingData.servicePoint.visitingAddress.streetName}{" "}
                {shippingData.servicePoint.visitingAddress.streetNumber}
              </h3>
              <h3 className="font-mont">
                {shippingData.servicePoint.visitingAddress.postalCode}{" "}
                {shippingData.servicePoint.visitingAddress.city}
              </h3>
            </div>
          )}
        </div>
        <div className="mb-3">
          <h2 className="font-mont font-semibold text-lg">
            Payment Information
          </h2>
          <h3 className="font-mont">
            Paument method: {paymentData[0].paymentType}
          </h3>
        </div>
        <div className="w-full flex justify-end">
          <button className="flex gap-5 justify-center px-4 py-2.5 w-full max-w-[325px] bg-black rounded-xl leading-[33.28px] text-white transition-transform duration-200 transform hover:scale-105 hover:bg-gray-700">
            <span className="font-mont font-medium text-base">
              Confirm Order
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default OrderSummary;
