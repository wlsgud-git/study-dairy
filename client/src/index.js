import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { HttpClient } from "./network/http.js";
import { FolderService } from "./service/folder.js";
import { FileService } from "./service/file.js";

const baseURL = process.env.REACT_APP_BASEURL;

const httpClient = new HttpClient(baseURL);
const folderService = new FolderService(httpClient);
const fileService = new FileService(httpClient);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App folderService={folderService} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
