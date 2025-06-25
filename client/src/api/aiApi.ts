import axios from "axios";
import type { SummarizeParams } from "../types/ai";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const summarizeNews = async ({ text, title }: SummarizeParams) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/ai/summarize`, {
      text,
      title,
    });

    return {
      success: true,
      data: response.data, // Will include { id, title, content, summary }
    };
  } catch (error: unknown) {
    let errorMessage = "Unknown error";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.error || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error summarizing news:", errorMessage);

    return {
      success: false,
      message: "Error summarizing news",
      error: errorMessage,
    };
  }
};
