import React from "react";
import { BikeParkFeatures } from "../components/bike-park-features";
import { HeroBanner } from "../components/hero-banner";
import { PageLayout } from "../components/page-layout";

export const HomePage = () => (
  <PageLayout>
    <HeroBanner />
    <BikeParkFeatures />
  </PageLayout>
);
