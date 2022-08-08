import React from "react";
import { BikeParkFeatures } from "../../components/feature-section/bike-park-features";
import { BookingBanner } from "../../components/CTA-banner/booking-banner";
import { HeroBanner } from "../../components/hero-banner/hero-banner";
import { PageLayout } from "../../components/page-layout/page-layout";

export const HomePage = () => (
  <PageLayout>
    <HeroBanner />
    <BookingBanner />
    <BikeParkFeatures />
  </PageLayout>
);
