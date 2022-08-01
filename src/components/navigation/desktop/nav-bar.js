import React from "react";
import { NavBarBrand } from "./nav-bar-brand";
import { NavBarButtons } from "./nav-bar-buttons";
import { NavBarLinks } from "./nav-bar-links";
import "./nav-bar.scss";

export const NavBar = () => {
  return (
    <header className="nav-bar__container">
      <nav className="nav-bar">
        <NavBarBrand />
        <div className="nav-bar__links">
          <NavBarLinks />
          <NavBarButtons />
        </div>
      </nav>
    </header>
  );
};
