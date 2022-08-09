import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Alert, Box, Button, Card, TextField, Typography } from "@mui/material";
import "./checkout-form.scss";

const clientURL=process.env.REACT_APP_API_CLIENT_URL;

export const CheckoutForm = (props) => {
  const { user } = useAuth0();
  const initialState = user ? user.email : "";

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(initialState);

  const handleEmailInput = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("stripe.js has not yet loaded");
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${clientURL}/booking/result`,
      }});

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
      console.log(message);
    } else {
      setMessage("An unexpected error occurred.");
      console.log(message);
    }

    setIsLoading(false);
  };

  return (
    <div className="checkout-form__container">
      <Typography variant="h3">Payment</Typography>
      <Card className="checkout-form__wrapper">
        <form
          id="payment-form"
          className="checkout-form"
          onSubmit={handleSubmit}>
          <Box>
            <TextField
              value={email}
              label="Email"
              type="email"
              variant="filled"
              margin="normal"
              onChange={handleEmailInput}
              fullWidth
              required
            />
            <Alert severity="info" sx={{ my: "1rem" }}>
              This Stripe payment form is running in Test mode. No payment will
              be collected. <br />
              To test the form, you may use the test card number
              "4000001240000000", any future date for expiry and any sequence of
              three digits for the CVC.
            </Alert>
          </Box>
          <PaymentElement id="payment-element" />
          <div className="checkout-form__actions">
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !stripe || !elements}
              id="submit"
              sx={{ mt: "1rem" }}>
              <span id="button-text">
                {isLoading ? (
                 'Processing...'
                ) : (
                  `Pay ${props.verifiedTotal} now`
                )}
              </span>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
