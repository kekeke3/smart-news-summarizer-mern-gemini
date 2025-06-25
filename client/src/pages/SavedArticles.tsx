// src/pages/SavedArticles.tsx
import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { getSavedArticles } from "../utils/storage";

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);

  useEffect(() => {
    setSavedArticles(getSavedArticles());
  }, []);

  const handleArticleUnsaved = () => {
    // Refresh the list when an article is unsaved
    setSavedArticles(getSavedArticles());
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">Saved Articles</h1>
        <p className="text-gray-600">Your collection of saved news articles</p>
      </div>

      {savedArticles.length === 0 ? (
        <div className="text-center text-gray-500 mt-12">
          You haven't saved any articles yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article, index) => (
            <NewsCard
              key={`saved-${article.url}-${index}`}
              article={article}
              showSaveButton={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticles;
