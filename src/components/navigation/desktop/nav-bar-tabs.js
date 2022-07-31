import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarTab } from "./nav-bar-tab";
import { Tabs } from "@mui/material";

export const NavBarTabs = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Tabs className="nav-bar__tabs" textColor="light">
      <NavBarTab path="/profile" label="Profile" />
      <NavBarTab path="/public" label="Public" />
      {isAuthenticated && (
        <>
          <NavBarTab path="/protected" label="Protected" />
          <NavBarTab path="/admin" label="Admin" />
        </>
      )}
    </Tabs>
  );
};
