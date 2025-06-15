// types.ts
export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  author?: string;
  date: string;
  category: string;
  image: string;
  url: string;
  aiSummary?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  savedArticles: string[];
  preferences: {
    darkMode: boolean;
    preferredCategories: string[];
    preferredSources: string[];
  };
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
}