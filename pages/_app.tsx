import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Auth0ProviderWithHistory } from "../auth0-provider-with-history";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Auth0ProviderWithHistory>
      <ToastContainer />
      <Component {...pageProps} />
    </Auth0ProviderWithHistory>
  );
}
