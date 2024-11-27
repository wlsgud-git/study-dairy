import express from "express";

import {
  getFolders,
  createFolder,
  deleteFolder,
  modifyFolder,
} from "../controller/folder.js";

const router = express.Router();

router.get("/folders", getFolders);
router.post("/folder", createFolder);
router.put("/folder", modifyFolder);
router.delete("/folder/:id", deleteFolder);

export default router;
