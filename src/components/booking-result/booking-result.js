import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useHistory } from "react-router-dom";

import { PageLayout } from "../page-layout/page-layout";
import { PageLoader } from "../animation-bike/page-loader";

import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import qrcode from '../../assets/qr-codes/demo-qrcode.png';

import "./booking-result.scss";

const serverURL = process.env.REACT_APP_API_SERVER_URL;

export const BookingResult = () => {
  const history = useHistory();
  const { user } = useAuth0();
  const searchParams = useLocation().search;

  const [paymentIntentData, setPaymentIntentData] = useState();
  const [riderId, setRiderId] = useState();
  const [isTransactionRecorded, setIsTransactionRecorded] = useState(false);
  const [isCheckin, setIsCheckin] = useState(false);
  const [open, setOpen] = useState(false);
  const [checkinPassType, setCheckinPassType] = useState();

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

  const handleRedirectToProfile = () => {
      history.push("/profile");
 };

  // Display/hide buttons to check-in on individual passes
  const activateCheckInMode = () => {
    if (!isCheckin) {
      setIsCheckin(true);
    } else {
      setIsCheckin(false);
    }
  };

  // Open modal with check-in information
  const handleOpen = (passType) => {
    setOpen(true);
    setCheckinPassType(passType);
  };

  // Close check-in modal
  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth:'10rem',
    width: '50%',
    minHeight:'20rem',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 12,
    textAlign:'center',
    p: 6,
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
                    {item.name === "full day pass" && (
                      <Brightness7Icon sx={{ fontSize: "5rem" }} />
                    )}
                    {item.name === "half day pass" && (
                      <Brightness6Icon sx={{ fontSize: "5rem" }} />
                    )}
                    {item.name === "evening pass" && (
                      <Brightness4Icon sx={{ fontSize: "5rem" }} />
                    )}
                    <Typography variant="h5" component="p" key={item.id}>
                      {item.quantity} x {item.name}
                    </Typography>
                    {isCheckin && (
                      <Button
                        variant="contained"
                        sx={{ mt: "1rem" }}
                        onClick={() => {
                          handleOpen(item.name);
                        }}>
                        Use this pass
                      </Button>
                    )}
                  </Card>
                </Grid>
              )
            )}
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Check In"
            aria-describedby="Scan the QR code on arrival at the bike park">
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Check in with your {checkinPassType}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Scan your QR code at the bike park front desk
              </Typography>
              <img src={qrcode} height='200px' alt='qr code for checkin at front desk' />
            </Box>
          </Modal>
          <Typography variant="h4" component="p" sx={{ my: "2rem" }}>
            What would you like to do next?
          </Typography>
          <Stack spacing={2} alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              sx={{ width: "fit-content" }}
              onClick={activateCheckInMode}>
              {isCheckin ? "Cancel check-in" : "Check in now"}
            </Button>
            <Button onClick={handleRedirectToProfile}>Manage your bookings</Button>
          </Stack>
        </Container>
      )}
    </PageLayout>
  );
};
