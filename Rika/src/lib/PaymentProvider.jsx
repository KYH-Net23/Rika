import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51QJtOIKTnkBH3a68Mw5LucP5WEubaAfvjGdySsq0rjdisrYHxwDmbrPEzmnrSA7JjaziZdIS5ed8GP0yJ3HCu50s00sCkbfLVt');

const PaymentContext = createContext();

export const usePaymentContext = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchSessionStatus = async (sessionId) => {
        if (!sessionId) {
            console.error("Session ID not found in the URL.");
            setLoading(false);
            return null;
        }

        if (sessionStorage.getItem(`emailSent-${sessionId}`)) {
            console.log("Email already sent");
            navigate('/');
            setLoading(false);
            return null;
        }

        try {
            const response = await fetch(`https://rika-payment.azurewebsites.net/session-status?session_id=${sessionId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch session status. HTTP Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status === 'complete') {
                sessionStorage.setItem(`emailSent-${sessionId}`, 'true');
                console.log(`Email sent successfully! to ${data.customer_email}`);
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
                return data;
            } else {
                console.warn("Session status not complete:", data.status);
                setStatus("abort");
            }
        } catch (error) {
            console.error("Error fetching session status:", error);
            fetchSessionStatus(); // failsafe s
            // window.location.reload();
        } finally {
            setLoading(false);
        }
        setStatus("fail");
        return null;
    };


    const createStripeSession = async (orderData) => {
        try {
            const response = await fetch(`https://rika-payment.azurewebsites.net/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            const data = await response.json();
            if (response.ok) {
                const stripe = await stripePromise;
                stripe.redirectToCheckout({ sessionId: data.sessionId });
            } else {
                console.log('Data error:', data.error);
            }
        } catch (err) {
            console.error('Error during checkout session creation:', err);
        }
    };

    return (
        <PaymentContext.Provider value={{ status, customerEmail, loading, createStripeSession, fetchSessionStatus }}>
            {children}
        </PaymentContext.Provider>
    );
};
