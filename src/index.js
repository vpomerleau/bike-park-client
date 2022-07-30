import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithHistory } from "./auth0-provider-with-history";
import { App } from "./App";
import "./styles/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>
);
