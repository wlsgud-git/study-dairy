import express from "express";

import {
  // 사전
  getDict,
  createDict,
  deleteDict,
  updateDict,
  // 검색
  SearchFile,
  // 파일 리스트
  getFileList,
  addFileList,
} from "../controller/dict.js";

const router = express.Router();

// get
router.get("/dict", getDict); //사전 가져오는 api
router.get("/fileList", getFileList);
router.get("/search", SearchFile); // 검색결과 api
// post
router.post("/dict", createDict); // 사전 생성 api
router.post("fileList", addFileList); // 파일리스트 추가 api
// put
router.put("/dict", updateDict); // 사전 수정 api
// delete
router.delete("/dict", deleteDict); // 사전 삭제 api

export default router;
