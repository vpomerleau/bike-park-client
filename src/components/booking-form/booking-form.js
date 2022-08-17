import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Divider, Grid, Typography } from "@mui/material";

import { Product } from "../product/product";

import "./booking-form.scss";

const serverURL = process.env.REACT_APP_API_SERVER_URL;

export const BookingForm = (props) => {
  const [products, setProducts] = useState([]);

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

  const isCartEmpty = () => {
    const emptyCart =
      props.cart.filter((item) => item.quantity > 0).length > 0 ? false : true;
    return emptyCart;
  };

  // Update cart content and order total when item quantity changes
  const updateCart = (cartItem) => {
    const itemInCart = props.cart.find(({ id }) => id === cartItem.id);
    if (!itemInCart) {
      if (cartItem.quantity > 0) {
        props.setCart([...props.cart, cartItem]);
        props.setTotal(props.total + cartItem.quantity * cartItem.price);
      }
    } else {
      const newItems = props.cart.map((item) => {
        // if the cart item has been updated
        if (cartItem.id === item.id) {
          const quantityChange = cartItem.quantity - item.quantity;
          // adjust total price to account for change in cart
          props.setTotal(props.total + cartItem.price * quantityChange);
          // include the updated item only if the quantity is > 0
          return { ...cartItem };
        } // leave unchanged item as they were and return them to the cart
        else return item;
      });
      const filteredItems = newItems.filter((item) => {
        return item.quantity > 0;
      });
      props.setCart(filteredItems);
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
        props.setStripeTransactionStatus(res.data.transactionStatus);

        // Convert from cents to dollars and format to canadian currency
        const formattedTotal = (res.data.calculatedAmount / 100).toLocaleString(
          "en-CA",
          {
            style: "currency",
            currency: "cad",
          }
        );

        props.setVerifiedTotal(formattedTotal);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPaymentIntent();
  };

  return (
    <div className="booking-form__container">
      <Typography variant="h3" sx={{ mb: "1rem" }}>
        Pass options
      </Typography>
      <form className="booking-form" onSubmit={handleSubmit}>
        {!products && <p>Fetching products...</p>}
        {products && (
          <Grid container spacing={2}>
            {products.map((product) => {
              return (
                <Product
                  key={product.id}
                  item={product}
                  updateCart={updateCart}
                  cart={props.cart}
                />
              );
            })}
          </Grid>
        )}
        <Divider sx={{ my: "1rem" }} />
        <Grid container>
          <Grid item xs={12} md={6} lg={8} sx={{ alignText: "left" }}>
            <Typography variant="h6" component="p">
              In your cart:
            </Typography>
            {props.cart.length === 0 && <Typography>Nothing yet!</Typography>}
            {props.cart &&
              props.cart.map((item) => {
                return (
                  <Typography key={item.id}>
                    {item.quantity} x {item.name}
                  </Typography>
                );
              })}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography align="right" sx={{ fontSize: "2rem", mb: "2rem" }}>
              Total:
              {props.total.toLocaleString("en-CA", {
                style: "currency",
                currency: "cad",
              })}
            </Typography>
            <div className="booking-form__actions">
              <Button
                type="submit"
                variant="contained"
                disabled={isCartEmpty()}>
                Checkout
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
