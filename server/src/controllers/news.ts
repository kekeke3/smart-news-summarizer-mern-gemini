import axios from "axios";
import { Request, Response } from "express";
const NewsBaseURL = process.env.NEWS_URL;
const NewsAPIKey = process.env.NEWS_API_KEY;

export const fetchEverythingNews = async (req: Request, res: Response) => {
  const { q = "the", page = 1 } = req.query as {
    q?: string;
    page?: number;
  };

  try {
    const response = await axios.get(`${NewsBaseURL}/everything`, {
      params: {
        q,
        page,
        pageSize: 20,
        apiKey: NewsAPIKey,
      },
    });

    res.json(response.data);
  } catch (error: any) {
    console.error("Error fetching news:", error.message);
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch everything news" });
  }
};

export const fetchTopHeadlinesNews = async (req: Request, res: Response) => {
  const {
    q = "the",
    category = "general",
    page = 1,
  } = req.query as {
    q?: string;
    category?: string;
    page?: number;
  };

  try {
    const response = await axios.get(`${NewsBaseURL}/top-headlines`, {
      params: {
        q,
        category,
        page,
        pageSize: 20,
        apiKey: NewsAPIKey,
      },
    });

    res.json(response.data);
  } catch (error: any) {
    console.error("Error fetching news:", error.message);
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch top headlines news" });
  }
};
