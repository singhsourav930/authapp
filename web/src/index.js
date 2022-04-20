import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Store from "hooks/store";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/montserrat";
import "scss/_styles.scss";

ReactDOM.render(
  <Store>
    <Router>
      <App />
    </Router>
  </Store>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
