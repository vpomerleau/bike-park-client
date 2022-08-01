import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

export const NavBarLink = ({ path, label }) => {
  return (
    <Link
      component={NavLink}
      to={path}
      exact
      className="nav-bar__link"
      activeClassName="nav-bar__link--active">{label}</Link>
  );
};
