import React, { useState } from "react";
import { Card, Grid, IconButton, TextField, Typography } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import "./booking-form.scss";

export const Product = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const { name, price } = item;

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleDecreaseQuantity = (e) => {
    e.preventDefault();
    setQuantity(parseInt(quantity) - 1);
  };

  const handleIncreaseQuantity = (e) => {
    e.preventDefault();
    setQuantity(parseInt(quantity) + 1);
  };

  return (
    <Grid item>
      {/* Style card https://material.io/components/cards */}
      <Card>
        {/* Add card media */}
        {/* Convert to card content */}
        <Typography>{name}</Typography>
        <Typography>
          {price.toLocaleString("en-CA", {
            style: "currency",
            currency: "cad",
          })}
        </Typography>
        {/* Card actions */}
        <div>
          <IconButton
            aria-label="decrease"
            value="-1"
            onClick={handleDecreaseQuantity}
            disabled={quantity <= 0}>
            <RemoveCircleIcon />
          </IconButton>
          <TextField value={quantity} onChange={handleQuantityChange} />
          <IconButton
            aria-label="increase"
            value="1"
            onClick={handleIncreaseQuantity}>
            <AddCircleIcon />
          </IconButton>
          <Typography>Sub-total: 
            {(quantity * price).toLocaleString("en-CA", {
              style: "currency",
              currency: "cad",
            })}
          </Typography>
        </div>
      </Card>
    </Grid>
  );
};
