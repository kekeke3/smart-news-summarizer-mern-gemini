export type NewsParams = {
  category?: string;
  q?: string;
  lang?: string;
  country?: string;
  page?: number;
  max?: number;
};

export type Article = {
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
};

export type NewsApiResponse = {
  totalArticles: number;
  articles: Article[];
};
