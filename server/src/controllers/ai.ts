import { Request, Response } from "express";
import axios from "axios";
import prisma from "../config/db";

export const summarizeText = async (req: Request, res: Response) => {
  const { text, title } = req.body;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        contents: [{ parts: [{ text }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    const summary = response.data.candidates[0].content.parts[0].text;

    // Save to MongoDB via Prisma
    const article = await prisma.article.create({
      data: {
        title,
        content: text,
        summary,
      },
    });

    res.json(article);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini or DB error" });
  }
};
