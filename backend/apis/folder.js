import express from "express";

import { getFolders, createFolder } from "../controller/folder.js";

const router = express.Router();

router.get("/folders", getFolders);
router.post("/folder", createFolder);
router.put("/folder/:id");
router.delete("/folder/:id");

export default router;
