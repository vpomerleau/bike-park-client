import React from "react";
import "./bike-park-feature.scss";
import { Card, Grid } from "@mui/material";

export const BikeParkFeature = ({ title, description, resourceUrl, icon }) => (
  <Grid item xs={12} md={6}>
    <Card className="bikepark-feature">
      <h3 className="bikepark-feature__headline">{title}</h3>
      <p className="bikepark-feature__description">{description}</p>
    </Card>
  </Grid>
);
