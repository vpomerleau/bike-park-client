import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import { PageLoader } from "./components/animation-bike/page-loader";
import { ProtectedRoute } from "./components/protected-route/protected-route";
import { BookingPage } from "./pages/booking-page/booking-page";
import { BookingResult } from "./components/booking-result/booking-result";
import { HomePage } from "./pages/home-page/home-page";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { ProfilePage } from "./pages/profile-page/profile-page";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PageLayout } from "./components/page-layout/page-layout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e845d",
    },
  },
});

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <PageLayout>
        <Typography variant="h2" component="p">Loading...</Typography>
        <PageLoader />
      </PageLayout>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <ProtectedRoute path="/profile" component={ProfilePage} />
        <ProtectedRoute exact path="/booking" component={BookingPage} />
        <Route path="/booking/result" component={BookingResult} />
        <Route path="*" component={NotFoundPage} />
        {/* Paths for optional Auth0 demo pages */}
        {/* <ProtectedRoute path="/protected" component={ProtectedPage} />
        <ProtectedRoute path="/admin" component={AdminPage} /> */}
        {/* <Route path="/public" component={PublicPage} /> */}
      </Switch>
    </ThemeProvider>
  );
};
