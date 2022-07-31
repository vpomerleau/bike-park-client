import React from "react";
import { NavBarBrand } from "./nav-bar-brand";
import { NavBarButtons } from "./nav-bar-buttons";
import { NavBarTabs } from "./nav-bar-tabs";
import "./nav-bar.scss";

export const NavBar = () => {
  return (
    <header className="nav-bar__container">
      <nav className="nav-bar">
        <NavBarBrand />
        <div className="nav-bar__links">
          <NavBarTabs />
          <NavBarButtons />
        </div>
      </nav>
    </header>
  );
};
