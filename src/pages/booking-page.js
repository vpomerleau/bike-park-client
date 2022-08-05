import React, { useState } from "react";
import { BookingForm } from "../components/booking-form";
import { CheckoutContainer } from "../components/checkout-container";
import { PageLayout } from "../components/page-layout";
import "./booking-page.scss";

export const BookingPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  return (
    <PageLayout>
      <div className="booking-page">
        <BookingForm setClientSecret={setClientSecret} />
        <CheckoutContainer clientSecret={clientSecret} />
      </div>
    </PageLayout>
  );
};
