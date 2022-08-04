import React, { useState } from "react";
import {
  Typography,
} from "@mui/material";
import { BookingForm } from "../components/booking-form";
import { CheckoutContainer } from "../components/checkout-container";
import { PageLayout } from "../components/page-layout";
import "./booking-page.scss";

export const BookingPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  return (
    <PageLayout>
      <div className="booking-page">
        <Typography variant="h3">Pass options</Typography>
        <BookingForm setClientSecret={setClientSecret} />
        <CheckoutContainer clientSecret={clientSecret} />
      </div>
    </PageLayout>
  );
};
