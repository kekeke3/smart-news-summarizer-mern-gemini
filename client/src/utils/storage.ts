// client/src/utils/storage.ts
import axios from "axios";
import type { Article } from "../types/news";

// Use environment variable if available, otherwise use default
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://smart-news-summarizer-mern-gemini.onrender.com";

// Generate/retrieve session ID
const getSessionId = (): string => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

// Get headers with proper typing
const getHeaders = () => {
  const headers: Record<string, string> = {
    "x-session-id": getSessionId(),
  };

  // Add user ID if logged in
  const userId = localStorage.getItem("userId");
  if (userId) {
    headers["x-user-id"] = userId;
  }

  return headers;
};

// Define a type for the save response
interface SaveResponse {
  success: boolean;
  article: Article;
  message?: string;
}

// Save article
export const saveArticle = async (article: Article): Promise<SaveResponse> => {
  try {
    const response = await axios.post<SaveResponse>(
      `${API_BASE_URL}/saved/save`,
      {
        articleId: article.url,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        source: article.source,
        content: article.content,
        publishedAt: article.publishedAt,
        category: article.category,
        author: article.author,
      },
      { headers: getHeaders() }
    );

    // Also save to localStorage as backup
    saveToLocalStorage(article);

    return response.data;
  } catch (error: unknown) {
    console.error("Error saving article:", error);
    saveToLocalStorage(article);
    return {
      success: false,
      article,
      message:
        error instanceof Error ? error.message : "Failed to save article",
    };
  }
};

// Remove article
export const unsaveArticle = async (article: Article): Promise<boolean> => {
  try {
    await axios.delete(
      `${API_BASE_URL}/saved/unsave/${encodeURIComponent(article.url)}`,
      { headers: getHeaders() }
    );

    removeFromLocalStorage(article);
    return true;
  } catch (error: unknown) {
    console.error("Error unsaving article:", error);
    removeFromLocalStorage(article);
    return true;
  }
};

// Get saved articles
export const getSavedArticles = async (): Promise<Article[]> => {
  try {
    const response = await axios.get<Article[]>(`${API_BASE_URL}/saved`, {
      headers: getHeaders(),
    });

    // Combine with localStorage
    const serverArticles = response.data;
    const localArticles = getFromLocalStorage();
    const combined = [...serverArticles, ...localArticles];

    // Remove duplicates by URL
    const uniqueArticles = combined.filter(
      (article, index, self) =>
        index === self.findIndex((a) => a.url === article.url)
    );

    return uniqueArticles;
  } catch (error: unknown) {
    console.error("Error fetching saved articles:", error);
    return getFromLocalStorage();
  }
};

// Check if article is saved
export const isArticleSaved = async (article: Article): Promise<boolean> => {
  try {
    const response = await axios.get<{ isSaved: boolean }>(
      `${API_BASE_URL}/saved/check/${encodeURIComponent(article.url)}`,
      { headers: getHeaders() }
    );

    return response.data.isSaved || checkLocalStorage(article);
  } catch (error: unknown) {
    console.error("Error checking saved status:", error);
    return checkLocalStorage(article);
  }
};

// Login function
export const loginAndMergeArticles = async (
  userId: string,
  token: string
): Promise<Article[]> => {
  try {
    // Store user credentials
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);

    // Merge guest articles to user account
    const response = await axios.post<Article[]>(
      `${API_BASE_URL}/saved/merge`,
      { userId },
      { headers: getHeaders() }
    );

    // Clear localStorage after successful merge
    localStorage.removeItem(SAVED_ARTICLES_KEY);

    return response.data;
  } catch (error: unknown) {
    console.error("Error merging articles:", error);
    throw error;
  }
};

// Logout function
export const logout = (): void => {
  // Remove user info but keep session ID for guest mode
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  // Keep sessionId so guest articles persist
};

// LocalStorage fallback
const SAVED_ARTICLES_KEY = "savedArticles_local";

const saveToLocalStorage = (article: Article): void => {
  const savedArticles = getFromLocalStorage();
  if (!savedArticles.some((a) => a.url === article.url)) {
    savedArticles.push(article);
    localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(savedArticles));
  }
};

const removeFromLocalStorage = (article: Article): void => {
  const savedArticles = getFromLocalStorage().filter(
    (a) => a.url !== article.url
  );
  localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(savedArticles));
};

const getFromLocalStorage = (): Article[] => {
  const saved = localStorage.getItem(SAVED_ARTICLES_KEY);
  return saved ? JSON.parse(saved) : [];
};

const checkLocalStorage = (article: Article): boolean => {
  const savedArticles = getFromLocalStorage();
  return savedArticles.some((a) => a.url === article.url);
};
