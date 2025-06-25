// src/utils/storage.ts
export interface Article {
  // Your existing article interface
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source?: {
    name: string;
  };
  // ... other fields
}

const SAVED_ARTICLES_KEY = "savedArticles";

export const saveArticle = (article: Article) => {
  const savedArticles = getSavedArticles();
  if (!savedArticles.some((a) => a.url === article.url)) {
    savedArticles.push(article);
    localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(savedArticles));
  }
};

export const unsaveArticle = (article: Article) => {
  const savedArticles = getSavedArticles().filter((a) => a.url !== article.url);
  localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(savedArticles));
};

export const getSavedArticles = (): Article[] => {
  const saved = localStorage.getItem(SAVED_ARTICLES_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const isArticleSaved = (article: Article): boolean => {
  return getSavedArticles().some((a) => a.url === article.url);
};
