import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Paper, Typography } from "@mui/material";

import "./booking-form.scss";
import { Product } from "./product";
import createAuth0Client from "@auth0/auth0-spa-js";

export const BookingForm = (props) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);


  const serverURL = process.env.REACT_APP_API_SERVER_URL;
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
    const emptyCart = (cart.filter(item=>item.quantity>0).length>0 ? false : true);
    return emptyCart;
  }

  // Update cart content and order total when item quantity changes
  const updateCart = (cartItem) => {
    const itemInCart = cart.find(({ id }) => id === cartItem.id);
    if (!itemInCart) {
      setCart([...cart, cartItem]);
      setTotal(total + cartItem.quantity * cartItem.price);
    } else {
      const newItems = cart.map((item) => {
        if (cartItem.id === item.id) {
          if (cartItem.quantity < item.quantity) {
            setTotal(total - cartItem.price);
          } else if (cartItem.quantity > item.quantity) {
            setTotal(total + cartItem.price);
          }
          return { ...cartItem };
        }
        return item;
      });
      setCart(newItems);
    }
  };

  // TODO cart reset
  const handleCartReset = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // convert cart state to JSON item list
    const body = JSON.stringify(cart);

    axios
      .post(
        `${process.env.REACT_APP_API_SERVER_URL}/create-payment-intent`,
        body,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        props.setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper className="booking-form__container">
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

        <Typography>
          Total:{" "}
          {total.toLocaleString("en-CA", {
            style: "currency",
            currency: "cad",
          })}
        </Typography>
        <Button variant="outlined" onClick={handleCartReset}>
          Reset Cart
        </Button>
        <Button type="submit" variant="contained" disabled={isCartEmpty()}>
          Checkout
        </Button>
      </form>
    </Paper>
  );
};
