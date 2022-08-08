import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../checkout-form/checkout-form";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_TEST_KEY);

export const CheckoutContainer = ({ clientSecret }) => {

  const appearance = {
    theme: "flat",
    variables: {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      borderRadius: "2px",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};
