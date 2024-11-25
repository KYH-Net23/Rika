import React from 'react'
import ArrowBack from '../common/ArrowBack'

const OrderConfirmation = () => {
    localStorage.setItem("OrderId", 10) //REMOVE HARD CODED DATA 8==D---
  return (
    <section className="flex flex-col justify-center items-center gap-6">
    <header className="flex flex-col justify-center items-center">
      <div className="items-start">
        <h1 className="font-mont font-semibold text-5xl">RIKA</h1>
        <p className="font-mont font-semibold">Online Shopping</p>
      </div>
    </header>
    <ArrowBack goBackTo={"/Products"}/>
    </section>
  )
}

export default OrderConfirmation
