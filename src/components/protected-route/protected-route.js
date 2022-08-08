import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Route } from "react-router-dom";
import { PageLoader } from "../animation-bike/page-loader";
import { PageLayout } from "../page-layout/page-layout";

export const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => (
        <PageLayout>
          <PageLoader />
        </PageLayout>
      ),
    })}
    {...args}
  />
);
