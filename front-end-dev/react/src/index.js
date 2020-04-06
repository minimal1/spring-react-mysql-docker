/** @format */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./styles/styles.css";

import App from "./App";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector("#root")
);
