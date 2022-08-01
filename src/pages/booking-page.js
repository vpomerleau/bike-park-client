import React, { useState } from "react";
import {
  Button,
  Card,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
/* import { CardElement } from 'react-stripe-elements'
import axios from 'axios'
import qs from 'query-string-object' */
import { PageLayout } from "../components/page-layout";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import "./booking-page.scss";

// TODO: get from database
const prices = {
  regular: 30,
};

export const BookingPage = () => {
  const [numDaypass, setNumDaypass] = useState(0);

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
    // TODO
  };

  return (
    <PageLayout>
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
                </div>
              </Card>
            </Grid>
          </Grid>

          <Button variant="outlined" onClick={handleCartReset}>
            Reset Cart
          </Button>
          {/* {!fetching
          ? <button type="submit" disabled={cart.banana === 0 && cart.cucumber === 0}>Purchase</button>
          : 'Purchasing...'
        } */}
          {/* Price:{((cart.banana * prices.banana + cart.cucumber * prices.cucumber) / 100).toLocaleString('en-US', {style: 'currency', currency: 'usd'})} */}
        </form>
      </Paper>
    </PageLayout>
  );
};
