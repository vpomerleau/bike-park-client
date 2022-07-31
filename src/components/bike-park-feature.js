import React from "react";
import "./bike-park-feature.scss";
import { Card } from "@mui/material";

export const BikeParkFeature = ({ title, description, resourceUrl, icon }) => (
  <Card className="bikepark-feature">
    <h3 className="bikepark-feature__headline">
      {title}
    </h3>
    <p className="bikepark-feature__description">{description}</p>
  </Card>
);
