import express from "express";
import {
  fetchEverythingNews,
  fetchTopHeadlinesNews,
} from "../controllers/news";

const router = express.Router();

router.get("/fetch-everything-news", fetchEverythingNews);
router.get("/fetch-top-headlines-news", fetchTopHeadlinesNews);

export default router;
