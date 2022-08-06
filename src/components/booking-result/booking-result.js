import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { PageLayout } from "../page-layout";
import "./booking-result.scss";

const serverURL = process.env.REACT_APP_API_SERVER_URL;

export const BookingResult = () => {
  const { user } = useAuth0();
  const [paymentData, setPaymentData] = useState();
  const [runTimes, setRunTimes] = useState(0);
  const [riderId, setRiderId] = useState();
  const[transactionId, setTransactionId] = useState();

  const searchParams = useLocation().search;
  const paymentIntentId = new URLSearchParams(searchParams).get(
    "payment_intent"
  );
  const clientSecret = new URLSearchParams(searchParams).get(
    "payment_intent_client_secret"
  );
  const status = new URLSearchParams(searchParams).get("redirect_status");

  // retrieve payment intent data from stripe
  useEffect(() => {
    axios
      .get(`${serverURL}/stripe/retrieve-payment-intent/${paymentIntentId}`)
      .then((res) => {
        setPaymentData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  if (runTimes === 0 && paymentData) {
    setRunTimes(1);
    createRiderProfile();
  }

  if (riderId) {
    createTransactionRecord();
  }

  if (transactionId) {
    console.log(`transaction logged in row ${transactionId}`)
  }

  // log transaction in database
  // log rider products in database

  // redirect to purchase confirmation page

  // on purchase confirmation page
  // show products purchased
  // provide link to view/manage bookings

  return (
    <PageLayout>
      <div className="booking-result__container">
        {/* show loader - payment processing */}
        {clientSecret && (
          <div id="payment-message">
            Please wait... your confirmation will be displayed shortly!
          </div>
        )}
      </div>
    </PageLayout>
  );
};
