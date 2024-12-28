import express from "express";

import {
  getDict,
  createDict,
  modifyDict,
  deleteDict,
  searchDict,
  getFile,
  deleteFileList,
  insertFileList,
  getFileList,
  modifyFileList,
} from "../controller/dict.js";

const router = express.Router();

// get
router.get("/dict/search", searchDict);
router.get("/dict", getDict);
router.get("/file", getFile);
router.get("/fileList", getFileList);

// post
router.post("/dict", createDict);
router.post("/fileList", insertFileList);
// put
router.put("/dict", modifyDict);
router.put("/fileList", modifyFileList);
// delete
router.delete("/dict", deleteDict);
router.delete("/fileList", deleteFileList);

export default router;
