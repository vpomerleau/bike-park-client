import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./button.scss";

export const BookingCTAButton = () => {
  const paymentLink = "https://buy.stripe.com/test_3cs9CSdEtgtabmwbII";

  return (
    <Button
      href={paymentLink}
      target="_blank"
      variant="contained"
      className="button__booking-cta">
      Buy Now
    </Button>
  );
};
