import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkout-form/checkout-form";
import { Paper } from "@mui/material";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_TEST_KEY);

export const CheckoutContainer = () => {
  const [clientSecret, setClientSecret] = useState("");

  // Create PaymentIntent as soon as the page loads
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_SERVER_URL;
    const body = JSON.stringify({ items: [{ id: "xl-tshirt" }] }); // get cart from localStorage or state?

    axios
      .post(`${apiUrl}/create-payment-intent`, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "flat",
    variables:{
      fontFamily:'Roboto, Helvetica, Arial, sans-serif',
      borderRadius:'2px'
    }
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Paper>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Paper>
  );
};
