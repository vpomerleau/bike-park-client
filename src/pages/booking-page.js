import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BookingForm } from "../components/booking-form";
import { BookingResult } from "../components/booking-result/booking-result";
import { CheckoutForm } from "../components/checkout-form/checkout-form";
import { PageLayout } from "../components/page-layout";
import "./booking-page.scss";
import { BrowserRouter, Route } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_TEST_KEY);

export const BookingPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

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
    <PageLayout>
      <div className="booking-page">
        <BookingForm setClientSecret={setClientSecret} cart={cart} setCart={setCart} total={total} setTotal={setTotal} />
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} cart={cart} total={total} />
          </Elements>
        )}
      </div>
    </PageLayout>
  );
};
