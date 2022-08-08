import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Typography } from "@mui/material";
import { useLocation, useHistory } from "react-router-dom";
import { PageLayout } from "../page-layout";
import { PageLoader } from "../page-loader";
import "./booking-result.scss";

const serverURL = process.env.REACT_APP_API_SERVER_URL;

export const BookingResult = () => {
  const { user } = useAuth0();
  const history = useHistory();
  const [paymentData, setPaymentData] = useState();
  const [runTimes, setRunTimes] = useState(0);
  const [riderId, setRiderId] = useState();
  const [transactionId, setTransactionId] = useState();
  const [riderProductCreated, setRiderProductCreated] = useState(false);

  const searchParams = useLocation().search;
  const paymentIntentId = new URLSearchParams(searchParams).get(
    "payment_intent"
  );

  // retrieve payment intent data from stripe
  useEffect(() => {
    axios
      .get(`${serverURL}/stripe/retrieve-payment-intent/${paymentIntentId}`)
      .then((res) => {
        setPaymentData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [paymentIntentId]);

  // Create a new rider from the login details
  const createRiderProfile = () => {
    const body = JSON.stringify({
      email: user.email,
      first_name: user.given_name,
      last_name: user.family_name,
    });
    axios
      .post(`${serverURL}/riders`, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setRiderId(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Create transaction record in database
  const createTransactionRecord = () => {
    const body = JSON.stringify({
      stripe_payment_id: paymentData.id,
      transaction_status: paymentData.status,
      rider_id: riderId,
    });

    axios
      .post(`${serverURL}/transaction`, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setTransactionId(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createRiderProductRecords = () => {
    const cartData = JSON.parse(paymentData.metadata.cart);

    Array.from(cartData).forEach((item) => {
      const riderProductId = `${transactionId}-${item.id}`;
      const body = JSON.stringify({
        id: riderProductId,
        transaction_id: transactionId,
        rider_id: riderId,
        product_id: item.id,
        quantity: item.quantity,
      });

      axios
        .post(`${serverURL}/rider-product`, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setRiderProductCreated(true);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  if (runTimes === 0 && paymentData) {
    setRunTimes(1);
    createRiderProfile();
  }

  if (riderId) {
    createTransactionRecord();
  }

  if (transactionId) {
    createRiderProductRecords();
  }

  const handleRedirectToProfile = () => {
    history.push("/profile");
  };

  return (
    <PageLayout>
      <div className="booking-result__container">
        {!transactionId && (
          <>
            <Typography variant="h2" component="p">
              Loading...
            </Typography>
          </>
        )}
        {riderId && (
          <Alert severity="success" sx={{ mb: "1rem" }} onClose={() => {}}>
            Rider profile created
          </Alert>
        )}
        {transactionId && (
          <Alert severity="success" sx={{ mb: "1rem" }} onClose={() => {}}>
            Transaction recorded
          </Alert>
        )}
        {riderProductCreated && (
          <Alert
            variant="filled"
            severity="success"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={handleRedirectToProfile}>
                Go to profile
              </Button>
            }>
            Tickets saved to your rider profile
          </Alert>
        )}
        <PageLoader />
      </div>
    </PageLayout>
  );
};
