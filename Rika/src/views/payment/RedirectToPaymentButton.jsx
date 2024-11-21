import React from 'react';
import { usePaymentContext } from '../../lib/PaymentProvider';

const RedirectToPaymentButton = ({ orderDetails }) => {
    const { createStripeSession } = usePaymentContext();
    return (
        <button
            onClick={() => createStripeSession(orderDetails)}
            className="bg-black text-white font-bold px-3 py-1 lg:py-2 lg:px-4 rounded-full border border-black hover:bg-white hover:text-black transition-colors duration-300">
            Pay with Stripe
        </button>
    );
}

export default RedirectToPaymentButton;
