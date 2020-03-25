import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./layouts/theme";
import { AuthProvider } from "./context/Auth.context";
import axios from "axios";
import LayoutWrapper from "./layouts/LayoutWrapper";
// Send auth cookies to API
axios.defaults.withCredentials = true;

// Remove hash in URL due to OAuth redirects after authentication
if (window.location.hash === "#_=_" || window.location.hash === "") {
  window.location.hash = ""; // for older browsers, leaves a # behind
  window.history.pushState("", document.title, window.location.pathname); // nice and clean
}
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
