import express from "express";

import {
  getFiles,
  createFile,
  deleteFile,
  modifyFile,
} from "../controller/file.js";

const router = express.Router();

router.get("/files", getFiles);
router.post("/file", createFile);
router.put("/file", modifyFile);
router.delete("/file/:id", deleteFile);

export default router;
