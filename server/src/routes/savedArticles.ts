// server/src/routes/savedArticles.ts
import express from "express";
import {
  saveArticle,
  unsaveArticle,
  getSavedArticles,
  isArticleSaved,
  mergeGuestArticles,
} from "../controllers/savedArticles";

const router = express.Router();

// Define route handlers
const handleSaveArticle = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await saveArticle(req, res);
  } catch (error) {
    console.error("Route handler error for saveArticle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleUnsaveArticle = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await unsaveArticle(req, res);
  } catch (error) {
    console.error("Route handler error for unsaveArticle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleGetSavedArticles = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await getSavedArticles(req, res);
  } catch (error) {
    console.error("Route handler error for getSavedArticles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleIsArticleSaved = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await isArticleSaved(req, res);
  } catch (error) {
    console.error("Route handler error for isArticleSaved:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleMergeGuestArticles = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await mergeGuestArticles(req, res);
  } catch (error) {
    console.error("Route handler error for mergeGuestArticles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Set up routes
router.post("/save", handleSaveArticle);
router.delete("/unsave/:articleId", handleUnsaveArticle);
router.get("/", handleGetSavedArticles);
router.get("/check/:articleId", handleIsArticleSaved);
router.post("/merge", handleMergeGuestArticles);

export default router;
