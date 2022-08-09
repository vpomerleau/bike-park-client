import React from "react";
import { BikeParkFeature } from "../feature-content/bike-park-feature";
import "./bike-park-features.scss";
import { PageLoader } from "../animation-bike/page-loader";
import { Grid } from "@mui/material";

export const BikeParkFeatures = () => {
  const featuresList = [
    {
      id: "1",
      title: "Riding for all ages, all riding levels",
      description:
        "The bike park is designed so that 80% of the park is rideable by 80% of riders. The remaining 20% includes toddler-specific learning areas and big jumps with air bags for advanced riders.",
      resourceUrl: "",
      icon: "",
    },
    {
      id: "2",
      title: "Talk to us about hosting your event",
      description:
        "Woodwork Bike Park offers turnkey solutions for birthday parties, team building activities. We have reservable group rooms, bike rentals, and activity guides - and a large outdoor space in addition to our indoor riding area.",
      resourceUrl: "",
      icon: "",
    },
  ];

  return (
    <div className="bikepark-features">
      <h2 className="bikepark-features__title">
        Explore Woodwork Bike Park Features
      </h2>
      <Grid container spacing={2} alignItems='stretch' sx={{mb:'0', pb:'0'}}>
        {featuresList.map((feature) => (
          <BikeParkFeature
            key={feature.id}
            title={feature.title}
            description={feature.description}
            resourceUrl={feature.resourceUrl}
            icon="fa-solid fa-bicycle"
          />
        ))}
      </Grid>
      <div className="bike__container">
        <PageLoader />
      </div>
    </div>
  );
};
