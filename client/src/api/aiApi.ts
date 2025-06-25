import axios from "axios";
import type { SummarizeParams } from "../types/ai";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const summarizeNews = async ({ content }: SummarizeParams) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/ai/summarize`, {
      params: { content },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    let errorMessage = "Unknown error";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error fetching news:", errorMessage);

    return {
      success: false,
      message: "Error fetching news",
      error: errorMessage,
    };
  }
};
