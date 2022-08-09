import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useHistory } from "react-router-dom";

import { PageLayout } from "../page-layout/page-layout";
import { PageLoader } from "../animation-bike/page-loader";

import {
  Alert,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness4Icon from '@mui/icons-material/Brightness4';
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
  const [isTransactionRecorded, setIsTransactionRecorded] = useState(false);
  const [isCheckin, setIsCheckin] = useState(false);

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
  // and creates new entries in the rider_product table for each item in the cart
  useEffect(() => {
    const createTransactionRecord = () => {
      const body = JSON.stringify({
        cart_details: paymentIntentData.metadata.cart,
        stripe_payment_id: paymentIntentData.id,
        transaction_status: paymentIntentData.status,
        rider_id: riderId,
      });

      axios
        .post(`${serverURL}/transaction`, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          setIsTransactionRecorded(true);
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

  const handleClick = () => {
    if (!isCheckin) {
      setIsCheckin(true);
    } else {
      setIsCheckin(false);
    }
  };

  return (
    <PageLayout>
      {!isTransactionRecorded && <PageLoader />}
      {isTransactionRecorded && (
        <Container
          className="booking-result__container"
          sx={{ textAlign: "center" }}>
          <Alert
            severity="success"
            variant="filled"
            icon={<CheckCircleIcon sx={{ height: "2rem" }} />}
            sx={{ fontSize: "1.5rem", mb: "2rem" }}>
            Success! Your purchase is complete.
          </Alert>
          <Typography variant="h4" component="p">
            You've purchased:
          </Typography>
          <Grid
            container
            spacing="1rem"
            sx={{ my: "1rem", justifyContent: "center" }}>
            {Array.from(JSON.parse(paymentIntentData.metadata.cart)).map(
              (item) => (
                <Grid item xs={12} md={6} lg={4}>
                  <Card sx={{ p: "1rem" }}>
                    {(item.name==='full day pass') && <Brightness7Icon sx={{fontSize:'5rem'}} />}
                    {(item.name==='half day pass') && <Brightness6Icon sx={{fontSize:'5rem'}} />}
                    {(item.name==='evening pass') && <Brightness4Icon sx={{fontSize:'5rem'}} />}
                    <Typography variant='h5' component='p' key={item.id}>
                      {item.quantity} x {item.name}
                    </Typography>
                    {isCheckin && <Button variant="contained" sx={{mt:'1rem'}}>Use this pass</Button>}
                  </Card>
                </Grid>
              )
            )}
          </Grid>
          <Typography variant="h4" component="p" sx={{ my: "2rem" }}>
            What would you like to do next?
          </Typography>
          <Stack spacing={2} alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              sx={{ width: "fit-content" }}
              onClick={handleClick}>
              {isCheckin ? "Cancel check-in" : "Check in now"}
            </Button>
            <Button>Manage your bookings</Button>
          </Stack>
        </Container>
      )}

      {/* <Typography variant="h1">Rider ID</Typography>
      <Typography>{riderId}</Typography>
      <Typography variant="h1">Payment Intent Data</Typography>
      <Typography>{JSON.stringify(paymentIntentData)}</Typography>
      <Typography variant="h1">Request Body</Typography>
      <Typography>{requestBody}</Typography> */}
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
