import express from "express";

const router = express.Router();

router.get("/folders");
router.post("/folder");
router.put("/folder/:id");
router.delete("/folder/:id");

export default router;
