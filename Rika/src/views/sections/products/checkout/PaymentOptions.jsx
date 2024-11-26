import ArrowBack from "../../../../common/ArrowBack";
import StripeIcon from "../../../../assets/icons/StripeIcon";
import SwishIcon from "../../../../assets/icons/SwishIcon";
import KlarnaIcon from "../../../../assets/icons/KlarnaIcon";

const PaymentOptions = ({ slideNumber, clickPrevFunc, clickNextFunc }) => {
  return (
    <>
      <ArrowBack clickFunc={clickPrevFunc} />
      <section className="flex flex-col min-w-[355px] md:min-w-[562px]">
        <h3 className="font-mont font-semibold">
          <span className="bg-[#CCC] py-1 px-[10px] rounded-full mr-2">
            {slideNumber}
          </span>
          Payment Options
        </h3>
        <div className="mt-4 p-4 border rounded-lg border-black">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  defaultChecked
                  className="w-5 h-5 border-gray-300 checked:bg-gray-500 checked:ring-gray-500 focus:ring-gray-500"
                />
              </label>
              <h3 className="font-mont font-semibold flex flex-col">
                Pay With Stripe.
                <span className="text-[#CCC] text-sm">
                  Safe & Smooth as Kimmo's Head
                </span>
              </h3>
            </div>
            <StripeIcon />
          </div>
          <div className="w-full border-t border-[#CCC] my-4" />
          <div className="flex justify-between">
            <h3 className="font-mont font-semibold flex flex-col text-gray-400">
              Pay With Klarna.
              <span className="text-[#CCC] text-sm">For The People</span>
            </h3>
            <KlarnaIcon />
          </div>
          <div className="w-full border-t border-[#CCC] my-4" />
          <div className="flex justify-between">
            <h3 className="font-mont font-semibold flex flex-col text-gray-400">
              Pay With Swish.
              <span className="text-[#CCC] text-sm ">Simplifying Everyday</span>
            </h3>
            <SwishIcon />
          </div>
        </div>
        <div className="flex w-full justify-end mt-6">
          <button
            onClick={clickNextFunc}
            className="flex gap-5 justify-center px-4 py-2.5 w-full max-w-[325px] bg-black rounded-xl leading-[33.28px] text-white transition-transform duration-200 transform hover:scale-105 hover:bg-gray-700"
          >
            <span className="font-mont font-medium text-base">
              Order Summary
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default PaymentOptions;
