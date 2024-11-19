import React from "react";
import ShippingForm from "./ShippingForm";

const Shipping = ({ slideNumber, clickNextFunc, clickPrevFunc }) => {
  return (
    <section className="flex flex-col min-w-[355px] md:min-w-[562px]">
      <h3 className="font-mont font-semibold">
        <span className="bg-[#CCC] py-1 px-[10px] rounded-full mr-2">
          {slideNumber}
        </span>
        Shipping
      </h3>
      <ShippingForm />
    </section>
  );
};

export default Shipping;
