import { Divider, Grid } from "@mui/material";
import React from "react";
import { BookingForm } from "../components/booking-form";
import { CheckoutContainer } from "../components/checkout-container";
import { PageLayout } from "../components/page-layout";
import "./booking-page.scss";

export const BookingPage = () => (
  <PageLayout>
    <Grid
      container
      spacing={2}
      justifyContent="space-around"
      aligIitems="flex-start"
      className="booking-page">
      <Grid item xs="auto">
        <BookingForm />
      </Grid>
      <Grid item xs="auto">
        <CheckoutContainer />
      </Grid>
    </Grid>
  </PageLayout>
);
