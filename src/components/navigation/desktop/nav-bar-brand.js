import React from "react";
import { NavLink } from "react-router-dom";
import logoColourHorizontalWhite from '../../../assets/logos/wbp-color-horizontal-white-text.svg';

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/" exact>
        <img
          className="nav-bar__logo"
          src={logoColourHorizontalWhite}
          alt="Woodwork Bike Park W logo and wordmark"
        />
      </NavLink>
    </div>
  );
};
