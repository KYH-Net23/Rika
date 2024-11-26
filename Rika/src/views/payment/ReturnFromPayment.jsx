import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePaymentContext } from '../../lib/PaymentProvider';
const ReturnFromPayment = () => {
    const { fetchSessionStatus, status, loading } = usePaymentContext();
    const hasFetched = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (hasFetched.current) return;

        hasFetched.current = true;
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id');
        fetchSessionStatus(sessionId);
    }, []);

    if (status === 'open' || status === 'abort') {
        // navigate('/checkout');
        redirectToHome();
    }

    if (loading) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <div className="inline-block w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" role="status"></div>
                <span className="ml-3 text-black">Preparing your email...</span>
            </div>
        );
    }

    const redirectToHome = () => {
        navigate('/');
    }

    if (status === 'complete') {
        return (
            <section id="success" className="flex flex-col min-h-screen justify-center items-center space-y-4" >
                <p>
                    We appreciate your business! A confirmation email has been sent to .
                    If you have any questions, please email <a href="mailto:orders@rika.com">orders@rika.com</a>.
                </p>
                <button
                    className="bg-black text-white font-bold px-3 py-1 lg:py-2 lg:px-4 rounded-full border border-black hover:bg-white hover:text-black transition-colors duration-300"
                    onClick={redirectToHome}>
                    Go to Home
                </button>
            </section>
        )
    }
}
export default ReturnFromPayment;