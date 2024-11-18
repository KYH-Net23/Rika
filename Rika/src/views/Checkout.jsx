import { useEffect, useState } from "react";
import ArrowBack from "../common/ArrowBack";
import CartCard from "./sections/products/checkout/CartCard";

const Checkout = () => {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCartData = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setTotalPrice(totalPrice);
    setData(cartItems);
  };

  useEffect(() => {
    getCartData();

    window.addEventListener("cartUpdated", getCartData);

    return () => {
      window.removeEventListener("cartUpdated", getCartData);
    };
  }, []);

  return (
    <section className="flex flex-col justify-center items-center gap-6">
      <header className="flex flex-col justify-center items-center">
        <div className="items-start">
          <h1 className="font-mont font-semibold text-5xl">RIKA</h1>
          <p className="font-mont font-semibold">Online Shopping</p>
        </div>
      </header>
      <div className="flex flex-col gap-5 max-w-xl">
      <ArrowBack goBackTo={"/products"} />
        <section className="flex flex-col min-w-[355px] md:min-w-[562px]">
          <h3 className="font-mont font-semibold">
            <span className="bg-[#CCC] py-1 px-[10px] rounded-full mr-2">1</span>
            Your cart
          </h3>
          <div className="my-4 flex flex-col gap-3">
            {data.map((cartItem) => (
              <CartCard key={cartItem.id} data={cartItem} />
            ))}
            <div className="w-full border-t border-[#CCC] my-4" />
          </div>
        </section>
        <section>
          <div className="flex flex-col gap-1">
            <h3 className="flex font-mont font-semibold justify-between">
              <span>Total:</span>
              <span>
                $
                {totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </h3>
            <h3 className="flex font-mont justify-between">
              <span>VAT:</span>
              <span>
                $
                {(totalPrice * 0.25).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </h3>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Checkout;
