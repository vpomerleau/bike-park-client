import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@mui/material";

export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      screen_hint: "signup",
      appState: {
        returnTo: "/profile",
      },
    });
  };

  return (
    <Button variant="outlined" className="button__sign-up" onClick={handleSignUp}>
      Sign Up
    </Button>
  );
};
