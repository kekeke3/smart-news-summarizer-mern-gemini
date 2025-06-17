import { Request, Response } from "express";
import axios from "axios";

export const summarizeText = async (req: Request, res: Response) => {
  const { text } = req.body;

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
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: "Gemini API failed." });
  }
};
