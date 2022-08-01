import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { PageLayout } from "../components/page-layout";
import CheckoutForm from "../components/checkoutForm/checkoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_TEST_KEY);

export const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  // Create PaymentIntent as soon as the page loads
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_SERVER_URL;
    const body = JSON.stringify({ items: [{ id: "xl-tshirt" }] });

    axios
      .post(`${apiUrl}/create-payment-intent`, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <PageLayout>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </PageLayout>
  );
};
