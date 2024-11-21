import React, { useEffect, useState } from 'react'
import ArrowBack from '../../../../common/ArrowBack'

const OrderSummary = ({slideNumber, clickNextFunc, clickPrevFunc}) => {
    const [cartItem, setCartItem] = useState([])

    useEffect(()=>{
        const cartItems = JSON.parse(localStorage.getItem("cartItems"))
    })
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
        <div>
            
        </div>
        </section>
    </>
  )
}

export default OrderSummary
