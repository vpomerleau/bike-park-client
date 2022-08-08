import React from "react";
import { BikeParkFeatures } from "../components/bike-park-features";
import { BookingBanner } from "../components/booking-banner";
import { HeroBanner } from "../components/hero-banner";
import { PageLayout } from "../components/page-layout";

export const HomePage = () => (
  <PageLayout>
    <HeroBanner />
    <BookingBanner />
    <BikeParkFeatures />
  </PageLayout>
);
