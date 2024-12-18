import express from "express";

import {
  getDict,
  createDict,
  modifyDict,
  deleteDict,
  searchDict,
} from "../controller/dict.js";

const router = express.Router();

// get
router.get("/dict/search", searchDict);
router.get("/dict", getDict);
// post
router.post("/dict", createDict);
// put
router.put("/dict", modifyDict);
// delete
router.delete("/dict", deleteDict);

export default router;
