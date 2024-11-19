import ShippingForm from "./ShippingForm";
import ArrowBack from "../../../../common/ArrowBack";

const Shipping = ({ slideNumber, clickNextFunc, clickPrevFunc }) => {
  return (
    <>
      <ArrowBack clickFunc={clickPrevFunc} />
      <section className="flex flex-col min-w-[355px] md:min-w-[562px]">
        <h3 className="font-mont font-semibold">
          <span className="bg-[#CCC] py-1 px-[10px] rounded-full mr-2">
            {slideNumber}
          </span>
          Shipping
        </h3>
        <ShippingForm clickFunc={clickNextFunc} />
      </section>
    </>
  );
};

export default Shipping;
