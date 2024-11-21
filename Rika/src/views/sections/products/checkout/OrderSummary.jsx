import { useEffect, useState } from "react";
import ArrowBack from "../../../../common/ArrowBack";

const OrderSummary = ({ slideNumber, clickNextFunc, clickPrevFunc }) => {
  const [cartData, setCartData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [shippingData, setShippingData] = useState([]);
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
  });

  return (
    <>
      <ArrowBack clickFunc={clickPrevFunc} />
      <section className="flex flex-col min-w-[355px] md:min-w-[562px]">
        <h3 className="font-mont font-semibold">
          <span className="bg-[#CCC] py-1 px-[10px] rounded-full mr-2">
            {slideNumber}
          </span>
          {cartData.map((product) => (
            <h1>{product.brand}</h1>
          ))}
          <h2>{paymentData[0].paymentType}</h2>
        </h3>
      </section>
    </>
  );
};

export default OrderSummary;
