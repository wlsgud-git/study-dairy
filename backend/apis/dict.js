import express from "express";

import {
  getDict,
  createDict,
  modifyDict,
  deleteDict,
} from "../controller/dict.js";

const router = express.Router();

router.get("/dict", getDict);
router.post("/dict", createDict);
router.put("/dict", modifyDict);
router.delete("/dict", deleteDict);

export default router;
