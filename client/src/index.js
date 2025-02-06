import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { StatusProvider } from "./context/status.js";

import { HttpClient } from "./network/http.js";
import { DictService } from "./service/dict.js";

const baseURL = process.env.REACT_APP_BASEURL;

const httpClient = new HttpClient(baseURL);
export const dictService = new DictService(httpClient);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StatusProvider dictService={dictService}>
      <App />
    </StatusProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
