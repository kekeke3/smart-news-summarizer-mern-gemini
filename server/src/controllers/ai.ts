import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "../config/db";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

export const summarizeText = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text, title } = req.body;

  if (!text || !title) {
    res.status(400).json({ error: "Text and title are required" });
    return;
  }

  try {
    const result = await model.generateContent(`Summarize this: ${text}`);
    const response = await result.response;

    const summary = response.text();

    const article = await prisma.article.create({
      data: {
        title,
        content: text,
        summary,
      },
    });

    res.status(200).json(article);
  } catch (error: any) {
    console.error("Gemini error:", error.message || error);
    res.status(500).json({ error: "Gemini or DB error" });
  }
};
