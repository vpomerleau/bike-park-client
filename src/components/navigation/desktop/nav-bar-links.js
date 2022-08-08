import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarLink } from "./nav-bar-link";

export const NavBarLinks = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__links">
      <NavBarLink path="/facilities" label="Facilities" />
      <NavBarLink path="/classes" label="Classes" />
      <NavBarLink path="/rentals" label="Rentals" />
      <NavBarLink path="/about" label="About us" />
      {/* Optional link format for protected pages */}
      {/* {isAuthenticated && (
        <>
          <NavBarLink path="/protected" label="Check-in" />
          <NavBarLink path="/admin" label="Admin dashboard" />
        </>
      )} */}
    </div>
  );
};
