import express from "express";

import {
  getDict,
  createDict,
  deleteDict,
  updateDict,
  SearchFile,
} from "../controller/dict.js";

const router = express.Router();

// get
router.get("/dict", getDict);
router.get("/search", SearchFile);
// post
router.post("/dict", createDict);
// put
router.put("/dict", updateDict);

// delete
router.delete("/dict", deleteDict);

export default router;
