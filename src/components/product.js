import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import "./booking-form.scss";

export const Product = (props) => {
  const [quantity, setQuantity] = useState(0);
  const { name, description, price, id } = props.item;

  useEffect(() => {
    const cartItem = { id: id, name: name, quantity: quantity, price: price };
    props.updateCart(cartItem);
  }, [quantity]);

  const handleQuantityChange = (e) => {
    e.preventDefault();
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

  const stepperButtons = [
    <Button
      aria-label="increase"
      value="1"
      onClick={handleIncreaseQuantity}>
      +
    </Button>,
    <Button
      aria-label="decrease"
      value="-1"
      onClick={handleDecreaseQuantity}
      disabled={quantity <= 0}>
      -
    </Button>,
  ];

  return (
    <Grid item xs={12} md={6} lg={4}>
      {/* Style card https://material.io/components/cards */}
      <Card sx={{ p: "2rem" }}>
        {/* TODO Add card media */}
        {/* TODO Convert to card content */}
        <Typography sx={{fontSize:'1.5rem', fontWeight:'bold', textTransform:'capitalize'}}>{name}</Typography>
        <Divider />
        <Typography sx={{ minHeight: "5rem", py: "1rem" }}>
          {description}
        </Typography>
        <Typography>
          {price.toLocaleString("en-CA", {
            style: "currency",
            currency: "cad",
          })}/pass
        </Typography>
        {/* TODO Card actions */}
        <div>
          <TextField value={quantity} onChange={handleQuantityChange} />
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
            size="small"
            disableElevation
            sx={{ml:"1rem"}}>
            {stepperButtons}
          </ButtonGroup>
          <Divider textAlign="right" sx={{ mt: "2rem", mb: "1rem" }}>
            Sub-total
          </Divider>
          <Typography textAlign="right">
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
