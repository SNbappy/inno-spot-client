import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";

const stripePromise = loadStripe("pk_test_51QhAuXJo6M9gjrVCNhOGB4qs1ZZlBmKwJRrI5UOqhC4AdIdQh5RXbHxXOJEKZJDixHrnzYQIljatO17nzAmaGZqo00uw2S2143");
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userInfo = {
                    name: currentUser.displayName || "Anonymous User",
                    image: currentUser.photoURL || "https://via.placeholder.com/150",
                    email: currentUser.email,
                };

                setUser(userInfo);

                try {
                    const response = await fetch(`${API_URL}/get-subscription-status?email=${userInfo.email}`);
                    const result = await response.json();
                    if (result.subscribed) {
                        setIsSubscribed(true);
                    }
                } catch (error) {
                    console.error("Failed to fetch subscription status:", error);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSubscription = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handlePaymentSuccess = () => {
        setIsSubscribed(true);
        setShowModal(false);

        Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Your subscription is now active. Welcome!",
            confirmButtonText: "OK",
        });
    };

    if (loading) {
        return <p>Loading user details...</p>;
    }

    return (
        <div>
            {user ? (
                <>
                    <div className="flex items-center mb-4">
                        <img src={user.image} alt="User" className="w-16 h-16 mr-4 rounded-full" />
                        <div>
                            <h2 className="text-2xl font-semibold">{user.name}</h2>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    {!isSubscribed ? (
                        <button
                            onClick={handleSubscription}
                            className="px-4 py-2 text-white bg-blue-600 rounded"
                        >
                            Subscribe for $10
                        </button>
                    ) : (
                        <div className="mt-4 text-green-600">Status: Verified</div>
                    )}

                    {showModal && (
                        <Elements stripe={stripePromise}>
                            <PaymentModal
                                onClose={handleCloseModal}
                                onPaymentSuccess={handlePaymentSuccess}
                                apiUrl={API_URL}
                                userEmail={user.email}
                            />
                        </Elements>
                    )}
                </>
            ) : (
                <p>No user logged in.</p>
            )}
        </div>
    );
};

const PaymentModal = ({ onClose, onPaymentSuccess, apiUrl, userEmail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        const cardElement = elements.getElement(CardElement);
        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Payment Error",
                text: error.message,
                confirmButtonText: "OK",
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/create-charge`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token.id,
                    amount: 1000,
                    userEmail,
                }),
            });

            const result = await response.json();

            if (result.success) {
                onPaymentSuccess();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Payment Failed",
                    text: "Please try again later.",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Unable to process payment. Please try again later.",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="p-6 bg-white rounded-lg w-80">
                <h3 className="mb-4 text-lg font-semibold">Subscription Payment</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <CardElement />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !stripe}
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded"
                    >
                        {loading ? "Processing..." : "Pay $10"}
                    </button>
                </form>
                <button
                    onClick={onClose}
                    className="mt-4 text-sm text-gray-600 hover:text-gray-800"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default MyProfile;
