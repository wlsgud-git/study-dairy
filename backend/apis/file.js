import express from "express";

const router = express.Router();

router.get("/files");
router.post("/file");
router.put("/file/:id");
router.delete("/file/:id");

export default router;
