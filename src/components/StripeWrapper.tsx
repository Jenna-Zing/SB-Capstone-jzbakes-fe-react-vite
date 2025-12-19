import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation, useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "@/hooks/useCart";

// Initialize Stripe outside of component
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_PUBLISHABLE_KEY
  ? loadStripe(STRIPE_PUBLISHABLE_KEY)
  : null;

export default function StripeWrapper() {
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems } = useCart();
  const [error, setError] = useState<string | null>(null);
  
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialized = useRef(false);

  // Calculate total to check if cart is empty before trying to create intent
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    // SCENARIO 1: We are on the Completion Page
    // We don't create a new intent; we just grab the existing one from the URL
    // so we can initialize <Elements> context for useStripe() access.
    if (location.pathname === "/complete") {
        const secret = searchParams.get("payment_intent_client_secret");
        if (secret) {
            setClientSecret(secret);
        }
        return;
    }

    // SCENARIO 2: We are on Checkout Page
    // Only attempt to fetch if there are items and we haven't initialized yet
    if (totalItems > 0 && !initialized.current && location.pathname === "/checkout") {
        initialized.current = true;
      setError(null);
      fetch("http://localhost:8080/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error("No clientSecret returned", data);
            setError("Failed to initialize payment. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
          setError("Error connecting to payment server.");
        });
    }
  }, [cartItems, totalItems, location.pathname, searchParams]);

  const appearance = {
    theme: "stripe" as const,
  };
  const options = {
    clientSecret,
    appearance,
  };

  // If Stripe key is missing
  if (!stripePromise) {
    return (
      <div className="p-8 text-center text-red-600">
        Error: Stripe Publishable Key is missing. Please check your environment
        variables.
      </div>
    );
  }

  // Handle empty cart (Only relevant on Checkout)
  if (totalItems === 0 && location.pathname === "/checkout") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-4">
        <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
        >
          Go back to shop
        </Link>
      </div>
    );
  }

  // Handle errors
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-4 text-red-600">
        <h2 className="text-xl font-bold">Something went wrong</h2>
        <p>{error}</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Return Home
        </Link>
      </div>
    );
  }

  // Loading state
  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-gray-600 font-medium animate-pulse">
          Loading secure checkout...
        </div>
      </div>
    );
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <Outlet context={{ clientSecret }} />
    </Elements>
  );
}
