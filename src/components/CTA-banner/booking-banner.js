import React from "react";
import { BookingCTAButton } from "../buttons/button-CTA";
import "./booking-banner.scss";
import { Typography } from "@mui/material";

export const BookingBanner = ({ title, description, resourceUrl, icon }) => (
  <div className="booking-banner__container">
    <div className="booking-banner">
      <Typography className="booking-banner__text" variant="h3">Come visit the bike park</Typography>
      <BookingCTAButton className="booking-banner__button" />
    </div>
  </div>
);
