import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";

const public_key = import.meta.env.VITE_APP_PUBLIC_KEY_STRIPE;
const stripePromise = loadStripe(public_key);

const Stripe = () => {
    return(
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Stripe;

