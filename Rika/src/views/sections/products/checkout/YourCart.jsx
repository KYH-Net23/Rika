import CartCard from "./cart/CartCard";

const YourCart = ({ data, totalPrice, slideNumber, clickFunc }) => {
  return (
    <section className="flex flex-col min-w-[355px] md:min-w-[562px]">
      <h3 className="font-mont font-semibold">
        <span className="bg-[#CCC] py-1 px-[10px] rounded-full mr-2">{slideNumber}</span>
        Your cart
      </h3>
      <div className="my-4 flex flex-col gap-3">
        {data.map((cartItem) => (
          <CartCard key={cartItem.id} data={cartItem} />
        ))}
        <div className="w-full border-t border-[#CCC] my-4" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="flex font-mont font-semibold justify-between">
          <span>Total:</span>
          <span>
            $
            {totalPrice.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
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
      <div className="w-full border-t border-[#CCC] my-4" />
      <div className="flex w-full justify-end mt-6">
        <button onClick={clickFunc} className="flex gap-5 justify-center px-4 py-2.5 w-full max-w-[325px] bg-black rounded-xl leading-[33.28px] text-white">
          <span className="font-mont font-medium text-base">
            Proceed to Shipping
          </span>
        </button>
      </div>
    </section>
  );
};

export default YourCart;
