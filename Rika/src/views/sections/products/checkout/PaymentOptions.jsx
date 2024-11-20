import ArrowBack from "../../../../common/ArrowBack";
import StripeIcon from "../../../../assets/icons/StripeIcon";
import SwishIcon from "../../../../assets/icons/SwishIcon";
import KlarnaIcon from "../../../../assets/icons/KlarnaIcon";

const PaymentOptions = ({ slideNumber, clickFunc }) => {
  return (
    <>
      <ArrowBack clickFunc={clickFunc} />
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
              <input
                type="radio"
                checked
                className="border border-black checked:border-black mb-8"
              />
              <h3 className="font-mont font-semibold flex flex-col">
                Pay with Stripe.
                <span className="text-[#CCC] text-sm">
                  Safe and smooth as Kimmo's head
                </span>
              </h3>
            </div>
            <StripeIcon />
          </div>
          <div className="w-full border-t border-[#CCC] my-4" />
          <div className="flex justify-between">
            <h3 className="font-mont font-semibold flex flex-col text-gray-400">
              Pay with Klarna.
              <span className="text-[#CCC] text-sm">For the broke people</span>
            </h3>
            <KlarnaIcon />
          </div>
          <div className="w-full border-t border-[#CCC] my-4" />
          <div className="flex justify-between">
            <h3 className="font-mont font-semibold flex flex-col text-gray-400">
              Pay with Swish.
              <span className="text-[#CCC] text-sm ">
                Simplifying everyday
              </span>
            </h3>
            <SwishIcon />
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentOptions;
