import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Typography } from "@mui/material";
import { useLocation, useHistory } from "react-router-dom";
import { PageLayout } from "../page-layout/page-layout";
import { PageLoader } from "../animation-bike/page-loader";
import "./booking-result.scss";

const serverURL = process.env.REACT_APP_API_SERVER_URL;

export const BookingResult = () => {
  // const { user } = useAuth0();
  // const history = useHistory();

  // const [runTimes, setRunTimes] = useState(0);

  // const [transactionId, setTransactionId] = useState();
  // const [riderProductCreated, setRiderProductCreated] = useState(false);
  // const [riderProducts, setRiderProducts] = useState();
  const { user } = useAuth0();
  const searchParams = useLocation().search;
  const [paymentIntentData, setPaymentIntentData] = useState();
  const [riderId, setRiderId] = useState();
  const [requestBody, setRequestBody] = useState();

  useEffect(() => {
    const paymentIntentId = new URLSearchParams(searchParams).get(
      "payment_intent"
    );

    // retrieve payment intent details from stripe
    const getPaymentIntentData = async () => {
      axios
        .get(`${serverURL}/stripe/retrieve-payment-intent/${paymentIntentId}`)
        .then((res) => {
          setPaymentIntentData(res.data);
          console.log("getPaymentIntentData");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // create a rider profile in the database from Auth0 user details
    // and return the rider id from the database
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
          console.log("createRiderProfile");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getPaymentIntentData();
    if (user) {
      createRiderProfile();
    }
  }, []);

  // when paymentIntentData and rider Id are both updated
  // create a transaction record in the database
  // this logs a new transaction in the transactions table
  // creates new entries in the product transaction table for each item in the cart
  // and creates new entries in the rider_product table for each item in the cart
  useEffect(() => {
    const createTransactionRecord = () => {
      const body = JSON.stringify({
        cart_details: paymentIntentData.metadata.cart,
        stripe_payment_id: paymentIntentData.id,
        transaction_status: paymentIntentData.status,
        rider_id: riderId,
      });

      console.log(body);

      setRequestBody(body);
      console.log("createTransactionRecord");

      axios
        .post(`${serverURL}/transaction`, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (paymentIntentData && riderId) {
      createTransactionRecord();
    }
  }, [paymentIntentData, riderId]);

  // retrieve payment intent data from stripe
  // useEffect(() => {
  //   axios
  //     .get(`${serverURL}/stripe/retrieve-payment-intent/${paymentIntentId}`)
  //     .then((res) => {
  //       setPaymentData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [paymentIntentId]);

  // Create a new rider from the login details
  // const createRiderProfile = () => {
  //   const body = JSON.stringify({
  //     email: user.email,
  //     first_name: user.given_name,
  //     last_name: user.family_name,
  //   });
  //   axios
  //     .post(`${serverURL}/riders`, body, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     .then((res) => {
  //       setRiderId(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // Create transaction record in database
  // const createTransactionRecord = () => {
  //   const body = JSON.stringify({
  //     stripe_payment_id: paymentData.id,
  //     transaction_status: paymentData.status,
  //     rider_id: riderId,
  //   });

  //   axios
  //     .post(`${serverURL}/transaction`, body, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     .then((res) => {
  //       setTransactionId(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const getRiderProducts = () => {
  //   console.log('getRiderProducts running')
  //   axios
  //     .get(`${serverURL}/rider-product/${riderId}`)
  //     .then((res) => {
  //       setRiderProducts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const createRiderProductRecords = () => {
  //   const cartData = JSON.parse(paymentData.metadata.cart);

  //   Array.from(cartData).forEach((item) => {
  //     const riderProductId = `${transactionId}-${item.id}`;
  //     const body = JSON.stringify({
  //       id: riderProductId,
  //       transaction_id: transactionId,
  //       rider_id: riderId,
  //       product_id: item.id,
  //       quantity: item.quantity,
  //     });

  //     axios
  //       .post(`${serverURL}/rider-product`, body, {
  //         headers: { "Content-Type": "application/json" },
  //       })
  //       .then((res) => {
  //         setRiderProductCreated(true);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // };

  //   if (runTimes === 0 && paymentData) {
  //     setRunTimes(1);
  //     createRiderProfile();
  //   }

  //   if (riderId) {
  //     createTransactionRecord();
  //   }

  //   if (transactionId) {
  //     createRiderProductRecords();
  //   }

  // if (riderProductCreated) {
  //   console.log('rider products detail call')
  //   getRiderProducts();
  // }

  //   const handleRedirectToProfile = () => {
  //     history.push("/profile");
  //   };

  return (
    <PageLayout>
      <Typography variant="h1">Rider ID</Typography>
      <Typography>{riderId}</Typography>
      <Typography variant="h1">Payment Intent Data</Typography>
      <Typography>{JSON.stringify(paymentIntentData)}</Typography>
      <Typography variant="h1">Request Body</Typography>
      <Typography>{requestBody}</Typography>
      {/* <div className="booking-result__container">
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
        {riderProducts && (<Typography>{JSON.stringify(riderProducts)}</Typography>)}
      </div> */}
    </PageLayout>
  );
};
