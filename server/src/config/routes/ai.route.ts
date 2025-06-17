import express from "express";

import { summarizeText } from "../controllers/ai.controller";

const router = express.Router();

router.post("/summarize", summarizeText);

export default router;
