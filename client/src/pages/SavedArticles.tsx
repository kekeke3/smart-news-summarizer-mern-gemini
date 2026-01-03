// client/src/pages/SavedArticles.tsx
import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { getSavedArticles } from "../utils/storage";
import type { Article } from "../utils/storage";

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      setIsLoading(true);
      try {
        const articles = await getSavedArticles();
        setSavedArticles(articles);
      } catch (error) {
        console.error("Error fetching saved articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedArticles();
  }, []);

  const handleArticleUnsaved = () => {
    // Refresh the list
    getSavedArticles().then(setSavedArticles);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">Saved Articles</h1>
        <p className="text-gray-600">Your collection of saved news articles</p>
        <p className="text-sm text-gray-500 mt-1">
          {savedArticles.length} article{savedArticles.length !== 1 ? "s" : ""}{" "}
          saved
        </p>
      </div>

      {savedArticles.length === 0 ? (
        <div className="text-center text-gray-500 mt-12">
          You haven't saved any articles yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article, index) => (
            <NewsCard
              key={`saved-${article.id || article.url}-${index}`}
              article={article}
              showSaveButton={true} // Keep save button to allow unsaving
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticles;
