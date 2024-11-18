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
    <section>
      <header className="flex flex-col justify-center items-center">
        <div className="items-start">
          <h1 className="font-mont font-semibold text-5xl">RIKA</h1>
          <p className="font-mont font-semibold">Online Shopping</p>
        </div>
      </header>
      <ArrowBack goBackTo={"/products"} />
      <br />
      <br />
      <section className="flex flex-col">
        <h3 className="font-mont font-semibold">
          <span className="bg-[#CCC] py-1 px-[10px] rounded-full mr-2">1</span>
          Your cart
        </h3>
        <div className="my-4">
          {data.map((cartItem) => (
            <CartCard key={cartItem.id} data={cartItem} />
          ))}
          <div className="w-full border-t border-[#CCC] my-4" />
        </div>
      </section>
    </section>
  );
};

export default Checkout;
