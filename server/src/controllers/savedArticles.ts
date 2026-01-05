// server/src/controllers/savedArticles.ts
import { Request, Response } from "express";
import prisma from "../config/db";

// Generate or get session ID
const getSessionId = (req: Request): string => {
  // Check cookies
  const cookies = req.headers.cookie || "";
  const sessionCookie = cookies
    .split(";")
    .find((c) => c.trim().startsWith("sessionId="));
  let sessionId = sessionCookie ? sessionCookie.split("=")[1] : null;

  // Check headers
  if (!sessionId) {
    const headerSessionId = req.headers["x-session-id"];
    if (headerSessionId && typeof headerSessionId === "string") {
      sessionId = headerSessionId;
    }
  }

  // Generate new if not exists
  if (!sessionId) {
    sessionId = `guest_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  return sessionId;
};

// Get user ID from headers or use session ID for guests
const getUserId = (req: Request): string => {
  const userId = req.headers["x-user-id"];
  const sessionId = getSessionId(req);

  // If logged in user, use their ID, otherwise use guest session
  return userId && typeof userId === "string" ? userId : `guest_${sessionId}`;
};

// Save article
export const saveArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const sessionId = getSessionId(req);

    const {
      articleId,
      title,
      description,
      url,
      urlToImage,
      source,
      content,
      publishedAt,
      category,
      author,
    } = req.body;

    if (!articleId || !title || !url) {
      res.status(400).json({
        error: "articleId, title, and url are required",
      });
      return;
    }

    // Check if already saved
    const existing = await prisma.savedArticle.findFirst({
      where: {
        userId,
        articleId,
      },
    });

    if (existing) {
      res.status(400).json({ error: "Article already saved" });
      return;
    }

    const savedArticle = await prisma.savedArticle.create({
      data: {
        userId,
        articleId,
        title,
        description: description || "",
        url,
        urlToImage: urlToImage || "",
        source: source?.name || source || "",
        content: content || "",
        publishedAt,
        category: category || "",
        author: author || "",
        savedAt: new Date(),
      },
    });

    // Set session cookie for guests (if not logged in)
    if (userId.startsWith("guest_")) {
      res.cookie("sessionId", sessionId, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: "none", // Changed to 'none' for cross-domain
        secure: true, // Must be true with sameSite: 'none'
      });
    }

    res.status(201).json(savedArticle);
  } catch (error: any) {
    console.error("Error saving article:", error);
    res.status(500).json({ error: "Failed to save article" });
  }
};

// Unsave article
export const unsaveArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { articleId } = req.params;

    const result = await prisma.savedArticle.deleteMany({
      where: {
        userId,
        articleId,
      },
    });

    if (result.count === 0) {
      res.status(404).json({ error: "Article not found in saved list" });
      return;
    }

    res.status(200).json({ message: "Article unsaved successfully" });
  } catch (error: any) {
    console.error("Error unsaving article:", error);
    res.status(500).json({ error: "Failed to unsave article" });
  }
};

// Get saved articles
export const getSavedArticles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);

    const savedArticles = await prisma.savedArticle.findMany({
      where: { userId },
      orderBy: { savedAt: "desc" },
    });

    res.status(200).json(savedArticles);
  } catch (error: any) {
    console.error("Error fetching saved articles:", error);
    res.status(500).json({ error: "Failed to fetch saved articles" });
  }
};

// Check if article is saved
export const isArticleSaved = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = getUserId(req);
    const { articleId } = req.params;

    const savedArticle = await prisma.savedArticle.findFirst({
      where: {
        userId,
        articleId,
      },
    });

    res.status(200).json({ isSaved: !!savedArticle });
  } catch (error: any) {
    console.error("Error checking saved status:", error);
    res.status(500).json({ error: "Failed to check saved status" });
  }
};

// Merge guest saved articles to user account (when user logs in)
export const mergeGuestArticles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sessionId = getSessionId(req);
    const guestUserId = `guest_${sessionId}`;
    const newUserId = req.body.userId;

    if (!newUserId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    // Find guest's saved articles
    const guestArticles = await prisma.savedArticle.findMany({
      where: { userId: guestUserId },
    });

    // Transfer each article to user account
    for (const article of guestArticles) {
      // Check if user already has this article
      const existing = await prisma.savedArticle.findFirst({
        where: {
          userId: newUserId,
          articleId: article.articleId,
        },
      });

      if (!existing) {
        // Update article to belong to user
        await prisma.savedArticle.update({
          where: { id: article.id },
          data: {
            userId: newUserId,
          },
        });
      } else {
        // Delete duplicate guest article
        await prisma.savedArticle.delete({
          where: { id: article.id },
        });
      }
    }

    // Get updated user articles
    const userArticles = await prisma.savedArticle.findMany({
      where: { userId: newUserId },
      orderBy: { savedAt: "desc" },
    });

    res.status(200).json(userArticles);
  } catch (error: any) {
    console.error("Error merging articles:", error);
    res.status(500).json({ error: "Failed to merge saved articles" });
  }
};
