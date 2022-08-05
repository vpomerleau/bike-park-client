import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./button.scss";

export const BookingCTAButton = () => {
  return (
    <Button
      component={Link}
      to="/booking"
      variant="contained"
      className="button__booking-cta">
      Buy Now
    </Button>
  );
};
