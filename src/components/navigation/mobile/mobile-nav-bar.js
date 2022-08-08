import React, { useState } from "react";
// import { MobileMenuToggleButton } from "./mobile-menu-toggle-button";
// import { MobileNavBarBrand } from "./mobile-nav-bar-brand";
// import { MobileNavBarButtons } from "./mobile-nav-bar-buttons";
// import { MobileNavBarTabs } from "./mobile-nav-bar-tabs";
import "./mobile-nav-bar.scss";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import woodworkLogo from "../../../assets/logos/wbp-color-horizontal-white-text.svg";

const pages = ["Facilities", "Classes", "Events", "About"];
const settings = ["Profile", "Passes and bookings", "Logout"];

// const MobileMenuState = {
//   CLOSED: "closed",
//   OPEN: "open",
// };

// const MobileMenuIcon = {
//   CLOSE: "close",
//   MENU: "menu",
// };

export const MobileNavBar = () => {
  // const [mobileMenuState, setMobileMenuState] = useState(
  //   MobileMenuState.CLOSED
  // );
  // const [mobileMenuIcon, setMobileMenuIcon] = useState(MobileMenuIcon.MENU);

  // const isMobileMenuOpen = () => {
  //   return mobileMenuState === MobileMenuState.OPEN;
  // };

  // const closeMobileMenu = () => {
  //   document.body.classList.remove("mobile-scroll-lock");
  //   setMobileMenuState(MobileMenuState.CLOSED);
  //   setMobileMenuIcon(MobileMenuIcon.MENU);
  // };

  // const openMobileMenu = () => {
  //   document.body.classList.add("mobile-scroll-lock");
  //   setMobileMenuState(MobileMenuState.OPEN);
  //   setMobileMenuIcon(MobileMenuIcon.CLOSE);
  // };

  // const toggleMobileMenu = () => {
  //   if (isMobileMenuOpen()) {
  //     closeMobileMenu();
  //   } else {
  //     openMobileMenu();
  //   }
  // };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor:'black'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Container sx={{ display: { xs: "none", md: "flex" } }}>
            <img src={woodworkLogo} alt="logo" height="44px" />
          </Container>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ mx: "auto", flexGrow: "1", alignItems:'space-around',py:'.5rem'}}>
            <img src={woodworkLogo} alt="logo" height="44px" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

// <div className="mobile-nav-bar__container">
//   <nav className="mobile-nav-bar">
//     <MobileNavBarBrand handleClick={closeMobileMenu} />
//     <MobileMenuToggleButton
//       icon={mobileMenuIcon}
//       handleClick={toggleMobileMenu}
//     />

//     {isMobileMenuOpen() && (
//       <div className="mobile-nav-bar__menu">
//         <MobileNavBarTabs handleClick={closeMobileMenu} />
//         <MobileNavBarButtons />
//       </div>
//     )}
//   </nav>
// </div>
//   );
// };
