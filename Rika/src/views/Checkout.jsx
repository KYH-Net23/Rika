import { useEffect, useState } from "react";
import YourCart from "./sections/products/checkout/OrderDetails";
import Shipping from "./sections/products/checkout/Shipping";
import PaymentOptions from "./sections/products/checkout/PaymentOptions";

const Checkout = () => {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [slide, setSlide] = useState(3);

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

  const handleNext = () => {
    if (slide < 3) {
      setSlide(slide + 1);
    }
  };

  const handlePrev = () => {
    if (slide > 1) {
      setSlide(slide - 1);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center gap-6">
      <header className="flex flex-col justify-center items-center">
        <div className="items-start">
          <h1 className="font-mont font-semibold text-5xl">RIKA</h1>
          <p className="font-mont font-semibold">Online Shopping</p>
        </div>
      </header>
      <div className="flex flex-col gap-5 max-w-xl">
        {slide === 1 ? (
          <YourCart
            data={data}
            totalPrice={totalPrice}
            slideNumber={slide}
            clickFunc={handleNext}
          />
        ) : slide === 2 ? (
          <Shipping
            slideNumber={slide}
            clickNextFunc={handleNext}
            clickPrevFunc={handlePrev}
          />
        ) : slide === 3 ? (
          <PaymentOptions slideNumber={slide} clickFunc={handlePrev} />
        ) : null}
      </div>
    </section>
  );
};

export default Checkout;
