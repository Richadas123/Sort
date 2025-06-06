// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import {BrowserRouter} from 'react-router-dom';
// import {Toaster} from 'react-hot-toast';
// import { Auth0Provider } from '@auth0/auth0-react';

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Auth0Provider
//     domain="dev-h53yw8m1dnygxzel.us.auth0.com"
//     clientId="NRBMesJ0Sc5nnJuRrHTDI8zON0JMqaqz"
//     authorizationParams={{
//       redirect_uri: window.location.origin
//     }}
//   >
//   <BrowserRouter>
//     <App />
//     <Toaster/>
//   </BrowserRouter>

//   </Auth0Provider>

  
// );




import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Auth0Provider } from "@auth0/auth0-react";

// Create the root render target
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app wrapped with Auth0 and HashRouter
root.render(
  <Auth0Provider
    domain="dev-h53yw8m1dnygxzel.us.auth0.com"
    clientId="QdNlwTy7TtprZDHip1tGEwLS6aR99vTd"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <HashRouter>
      <App />
      <Toaster />
    </HashRouter>
  </Auth0Provider>
);


