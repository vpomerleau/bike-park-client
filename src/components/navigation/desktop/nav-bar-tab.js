import React from "react";
import { NavLink } from "react-router-dom";
import { Tab } from "@mui/material";

export const NavBarTab = ({ path, label }) => {
  return (
    <Tab component={NavLink}
      to={path}
      exact
      label={label}
      value={path}
      className="nav-bar__tab"
      activeClassName="nav-bar__tab--active"
    />
  );
};
