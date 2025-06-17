import axios from "axios";
import { Request, Response } from "express";
const GnewsBaseURL = process.env.GNEWS_URL;
const GnewsAPIKey = process.env.GNEWS_API_KEY;

export const fetchNews = async (req: Request, res: Response) => {
  const { q, lang, country, max } = req.query;
  
  try {
    const response = await axios.get(`${GnewsBaseURL}`, {
      params: {
        q,
        lang,
        country,
        max,
        apiKey: GnewsAPIKey,
      },
    });

    res.json(response.data);
  } catch (error: any) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news articles" });
  }
};
