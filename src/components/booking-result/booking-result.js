import React from "react";
import { PageLayout } from "../page-layout";
import './booking-result.scss';

export const BookingResult = () => {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );
  const status = new URLSearchParams(window.location.search).get(
    "redirect_status"
  );

  return (
    <PageLayout>
      <div className="booking-result__container">
        {clientSecret && <div id="payment-message">{status}</div>}
      </div>
    </PageLayout>
  );
};
