import axios from "axios";
import type { NewsParams } from "../types/news";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const fetchEverythingNews = async ({ q, page = 1 }: NewsParams) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/news/fetch-everything-news`,
    {
      params: { q, page },
    }
  );

  return response.data; // { status, totalResults, articles }
};

export const fetchTopHeadlinesNews = async ({
  q,
  category,
  page = 1,
}: NewsParams) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/news/fetch-top-headlines-news`,
    {
      params: { q, category, page },
    }
  );

  return response.data; // { status, totalResults, articles }
};
