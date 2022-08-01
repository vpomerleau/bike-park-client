import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarLink } from "./nav-bar-link";

export const NavBarLinks = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__links">
      <NavBarLink path="/public" label="Public" />
      {isAuthenticated && (
        <>
          <NavBarLink path="/protected" label="Protected" />
          <NavBarLink path="/admin" label="Admin" />
        </>
      )}
    </div>
  );
};
