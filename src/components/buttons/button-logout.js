import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "@mui/material";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <Link className="button__logout" onClick={handleLogout}>
      Log Out
    </Link>
  );
};
