import { Grid } from "@mui/material";
import React, {useState} from "react";
import { BookingForm } from "../components/booking-form";
import { CheckoutContainer } from "../components/checkout-container";
import { PageLayout } from "../components/page-layout";
import "./booking-page.scss";

export const BookingPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  return (
    <PageLayout>
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        alignItems="flex-start"
        className="booking-page">
        <Grid item xs="auto">
          <BookingForm setClientSecret={setClientSecret} />
        </Grid>
        <Grid item xs="auto">
          <CheckoutContainer clientSecret={clientSecret} />
        </Grid>
      </Grid>
    </PageLayout>
  );
};
