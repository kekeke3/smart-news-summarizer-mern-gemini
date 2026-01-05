export type NewsParams = {
  category?: string;
  q?: string;
  lang?: string;
  country?: string;
  page?: number;
  max?: number;
};

/* export type Article = {
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };

  category?: string;
}; */

export interface Article {
  id?: string;
  title: string;
  description: string;
  source: {
    id: string | null;
    name: string;
  };
  publishedAt: string;
  urlToImage: string | null;
  url: string;
  category?: string;
  content?: string; // Add this line - make it optional since not all articles might have it
  author?: string;
}

export type NewsApiResponse = {
  totalArticles: number;
  articles: Article[];
};
