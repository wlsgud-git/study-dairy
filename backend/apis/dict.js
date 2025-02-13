import express from "express";

import {
  // 사전
  getDict,
  getFile,
  createDict,
  deleteDict,
  updateDict,
  // 검색
  SearchFile,
  ImgUpload,
  // 파일 리스트
  getFileList,
  addFileList,
  deleteFileList,
} from "../controller/dict.js";
import multer from "multer";

import { dictValidate } from "../middleware/validate.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// get
router.get("/dict", getDict); //사전 가져오는 api
router.get("/fileList", getFileList); // 파일리스트 가져오는 api
router.get("/file", getFile);
router.get("/search", SearchFile); // 검색결과 api

// post
router.post("/dict", dictValidate(), createDict); // 사전 생성 api
router.post("/fileList", addFileList); // 파일리스트 추가 api
router.post("/img", upload.single("content_img"), ImgUpload);
// put
router.put("/dict", updateDict); // 사전 수정 api
// delete
router.delete("/dict", deleteDict); // 사전 삭제 api
router.delete("/fileList", deleteFileList); //파일리스트 삭제 api

export default router;
