import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../config/db";

// ✅ Safety check at startup
if (!process.env.GEMINI_API_KEY) {
  throw new Error("❌ GEMINI_API_KEY is missing in environment variables");
}

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Use a STABLE model (important)
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const summarizeText = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text, title } = req.body;

  // ✅ Validate request
  if (!text || !title) {
    res.status(400).json({ error: "Text and title are required" });
    return;
  }

  try {
    // ✅ Prevent token overflow
    const MAX_CHARS = 8000;
    const truncatedText =
      text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) : text;

    // ✅ Generate summary
    const result = await model.generateContent(
      `Summarize the following news article in 4–5 clear sentences:\n\n${truncatedText}`
    );

    const summary = result.response.text();

    if (!summary) {
      throw new Error("Gemini returned empty summary");
    }

    // ✅ Save to DB
    const article = await prisma.article.create({
      data: {
        title,
        content: truncatedText,
        summary,
      },
    });

    res.status(200).json(article);
  } catch (error: any) {
    // ✅ REAL error logging
    console.error("❌ Gemini / DB Error:", error);

    res.status(500).json({
      error: error.message || "Failed to summarize article",
    });
  }
};
