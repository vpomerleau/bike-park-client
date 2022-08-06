import React from "react";
import { useLocation } from "react-router-dom";
import { PageLayout } from "../page-layout";
import "./booking-result.scss";

export const BookingResult = () => {
  const searchParams = useLocation().search;

  const paymentIntentId = new URLSearchParams(searchParams).get(
    "payment_intent"
  );

  const clientSecret = new URLSearchParams(searchParams).get(
    "payment_intent_client_secret"
  );
  const status = new URLSearchParams(searchParams).get(
    "redirect_status"
  );

  // show loader - payment processing

  // paymentIntent object from stripe
  // create rider id
  // log transaction in database
  // log rider products in database

  // redirect to purchase confirmation page

  // on purchase confirmation page
  // show products purchased
  // provide link to view/manage bookings

  return (
    <PageLayout>
      <div className="booking-result__container">
        {clientSecret && <div id="payment-message">{paymentIntentId}: {status}</div>}
      </div>
    </PageLayout>
  );
};
