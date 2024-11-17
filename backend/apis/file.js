import express from "express";

import { getFiles, createFile } from "../controller/file.js";

const router = express.Router();

router.get("/files", getFiles);
router.post("/file", createFile);
router.put("/file/:id");
router.delete("/file/:id");

export default router;
