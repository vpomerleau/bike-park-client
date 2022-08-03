import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import "./booking-form.scss";

// TODO: get from database
const prices = {
  regular: 30,
};

export const BookingForm = () => {
  const [numDaypass, setNumDaypass] = useState(0);
  const [cart, setCart] = useState({});

  const handleNumDaypassChange = (e) => {
    setNumDaypass(e.target.value);
    console.log(numDaypass);
  };

  const handleDecreaseDaypass = (e) => {
    e.preventDefault();
    setNumDaypass(parseInt(numDaypass) - 1);
  };

  const handleIncreaseDaypass = (e) => {
    e.preventDefault();
    setNumDaypass(parseInt(numDaypass) + 1);
  };

  const handleCartReset = (e) => {
    e.preventDefault();
    setNumDaypass(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // convert cart state to JSON item list
    const body = JSON.stringify(cart);

    axios
      .post(
        `${process.env.REACT_APP_API_SERVER_URL}//create-payment-intent`,
        body,
      )
      .then()
      .catch();
  };

  return (
    <Paper className="booking-form__container">
      <form className="booking-form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item>
            {/* Style card https://material.io/components/cards */}
            <Card>
              {/* Add card media */}
              {/* Convert to card content */}
              <Typography>Full Day Pass</Typography>
              <Typography>
                {prices.regular.toLocaleString("en-CA", {
                  style: "currency",
                  currency: "cad",
                })}
              </Typography>
              {/* Card actions */}
              <div>
                <IconButton
                  aria-label="decrease"
                  value="-1"
                  onClick={handleDecreaseDaypass}
                  disabled={numDaypass <= 0}>
                  <RemoveCircleIcon />
                </IconButton>
                <TextField
                  value={numDaypass}
                  onChange={handleNumDaypassChange}
                />
                <IconButton
                  aria-label="increase"
                  value="1"
                  onClick={handleIncreaseDaypass}>
                  <AddCircleIcon />
                </IconButton>
                <Typography>
                  {(numDaypass * prices.regular).toLocaleString("en-CA", {
                    style: "currency",
                    currency: "cad",
                  })}
                </Typography>
              </div>
            </Card>
          </Grid>
        </Grid>

        <Typography>
          Total:{" "}
          {(numDaypass * prices.regular).toLocaleString("en-CA", {
            style: "currency",
            currency: "cad",
          })}
        </Typography>
        <Button variant="outlined" onClick={handleCartReset}>
          Reset Cart
        </Button>
        {/* TODO disable button when cart is empty */}
        <Button type="submit" variant="contained">
          Checkout
        </Button>
      </form>
    </Paper>
  );
};
