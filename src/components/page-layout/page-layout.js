import React from "react";
import { useMediaQuery } from "react-responsive";
import { NavBar } from "../navigation/desktop/nav-bar";
import { MobileNavBar } from "../navigation/mobile/mobile-nav-bar";
import { PageFooter } from "../footer/page-footer";
import "./page-layout.scss";

export const PageLayout = ({ children }) => {
  const isTabletOrLarger = useMediaQuery({ query: "(min-width:769px" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="page-layout">
      {isTabletOrLarger && <NavBar />}
      {isMobile && <MobileNavBar />}
      <div className="page-layout__content">{children}</div>
      <PageFooter />
    </div>
  );
};
