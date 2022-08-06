import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Grid, Typography } from "@mui/material";

import { Product } from "./product";

import "./booking-form.scss";

const serverURL = process.env.REACT_APP_API_SERVER_URL;

export const BookingForm = (props) => {
  const [products, setProducts] = useState([]);
  const [riders, setRiders] = useState([]);
  const [riderId, setRiderId] = useState();

  const { user } = useAuth0();

  const getAllProducts = () => {
    axios
      .get(`${serverURL}/products`, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Get list of all products from database on first load
  useEffect(() => {
    getAllProducts();
  }, []);

  // Get list of all riders from database on first load
  useEffect(() => {
    getAllRiders();
  }, []);

  // Get riderId of currently logged in user, after list of users in obtained from the server
  useEffect(() => {
    if (riders.length > 0) {
      getRiderId();
    }
  }, [riders]);

  const isCartEmpty = () => {
    const emptyCart =
      props.cart.filter((item) => item.quantity > 0).length > 0 ? false : true;
    return emptyCart;
  };

  // Update cart content and order total when item quantity changes
  const updateCart = (cartItem) => {
    const itemInCart = props.cart.find(({ id }) => id === cartItem.id);
    if (!itemInCart) {
      props.setCart([...props.cart, cartItem]);
      props.setTotal(props.total + cartItem.quantity * cartItem.price);
    } else {
      const newItems = props.cart.map((item) => {
        if (cartItem.id === item.id) {
          if (cartItem.quantity < item.quantity) {
            props.setTotal(props.total - cartItem.price);
          } else if (cartItem.quantity > item.quantity) {
            props.setTotal(props.total + cartItem.price);
          }
          return { ...cartItem };
        }
        return item;
      });
      props.setCart(newItems);
    }
  };

  const createPaymentIntent = () => {
    const cartDetails = JSON.stringify(props.cart);

    axios
      .post(`${serverURL}/stripe/create-payment-intent`, cartDetails, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        props.setClientSecret(res.data.clientSecret);
        props.setPaymentIntentId(res.data.paymentIntentId);
      })
      .catch((err) => console.log(err));
  };

  const getAllRiders = () => {
    axios
      .get(`${serverURL}/riders`)
      .then((res) => {
        setRiders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findRiderByEmail = () => {
    return riders.filter((rider) => rider.email === user.email);
  };

  const getRiderId = () => {
    let rider = findRiderByEmail();
    if (rider.length === 0) {
      createRiderProfile();
      rider = findRiderByEmail();
    }
    setRiderId(rider[0].id);
  };

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
        console.log(res.data);
        getAllRiders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createTransactionRecord = () => {};

  const logRiderProducts = () => {};

  // TODO cart reset
  // const handleCartReset = (e) => {
  //   e.preventDefault();
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send payment intent to Stripe
    // returns client secret and payment intent id
    createPaymentIntent();
    console.log(riderId);

    // Add transaction to transactions table

    // Add purchased producted to rider_products table
  };

  return (
    <div className="booking-form__container">
      <Typography variant="h3" sx={{ mb: "1rem" }}>
        Pass options
      </Typography>
      <form className="booking-form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {products.map((product) => {
            return (
              <Product
                key={product.id}
                item={product}
                updateCart={updateCart}
              />
            );
          })}
        </Grid>

        {props.cart.map((item) => {
          return (
            item.quantity > 0 && (
              <Typography key={item.id} align="right" sx={{ my: "1rem" }}>
                {item.quantity} {item.name}
              </Typography>
            )
          );
        })}

        <Typography align="right" sx={{ fontSize: "2rem", my: "2rem" }}>
          Total:
          {props.total.toLocaleString("en-CA", {
            style: "currency",
            currency: "cad",
          })}
        </Typography>
        <div className="booking-form__actions">
          {/* <Button variant="outlined" onClick={handleCartReset}>
            Reset Cart
          </Button> */}
          <Button type="submit" variant="contained" disabled={isCartEmpty()}>
            Checkout
          </Button>
        </div>
      </form>
    </div>
  );
};
