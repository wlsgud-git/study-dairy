import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { config } from "./config.js";
import cors from "cors";
import fs from "fs";

// api
import FolderApi from "./apis/folder.js";
import FileApi from "./apis/file.js";

const app = express();
const __dirname = path.resolve();
// const corsOptions = {
//   credentails: true,
//   options,
// };

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/build")));
// app.use(cors(corsOptions));

// api middleware
app.use("/", FolderApi);
app.use("/", FileApi);

app.use((req, res, next) => {
  next();
});
app.use((error, req, res, next) => {
  res.status(400).json({ message: err.message });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(config.http.port, () => {
  console.log(`study dairy start!!! with ${config.http.port} port`);
});
