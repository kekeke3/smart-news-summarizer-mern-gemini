// client/src/components/NewsCard.tsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isArticleSaved, saveArticle } from "../utils/storage"; // Import saveArticle
import SaveButton from "./SaveButton";
import type { Article } from "../types/news"; // Fix import path

interface NewsCardProps {
  article: Article;
  showSaveButton?: boolean;
  onSummarize?: () => void; // Add if needed
}

const NewsCard = ({ article, showSaveButton = true }: NewsCardProps) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      const saved = await isArticleSaved(article);
      setIsSaved(saved);
    };
    checkSavedStatus();
  }, [article]);

  const handleViewArticle = () => {
    navigate("/article", { state: { article } });
  };

  const handleSaveArticle = async () => {
    try {
      await saveArticle(article);
      setIsSaved(true);
    } catch (error) {
      console.error("Failed to save article:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition relative">
      {showSaveButton && (
        <div className="absolute top-2 right-2 z-10">
          <SaveButton
            article={article}
            size="md"
            onLoginRequest={() => setShowLoginModal(true)}
          />
        </div>
      )}

      {/* Article image */}
      {article.urlToImage && (
        <div className="relative">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-48 object-cover cursor-pointer"
            onClick={handleViewArticle}
          />
          {/* Add saved badge - USE isSaved STATE */}
          {isSaved && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              Saved
            </div>
          )}
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
            <div className="p-6">
              <h3 className="text-lg font-bold text-dark mb-4">
                Sign In to Save
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                Create an account or sign in to save articles.
              </p>
              <div className="space-y-3">
                <button
                  onClick={async () => {
                    // Simple mock login
                    localStorage.setItem("userId", `demo_user_${Date.now()}`);
                    localStorage.setItem(
                      "userData",
                      JSON.stringify({
                        name: "Demo User",
                        email: "demo@example.com",
                      })
                    );
                    setShowLoginModal(false);
                    // Save the article after login
                    await handleSaveArticle(); // Use the handler function
                  }}
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition font-medium"
                >
                  Continue as Demo User
                </button>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-primary">
            {article.source?.name || "Unknown source"}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <h3 className="text-xl font-bold text-dark mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>

        <div className="flex justify-between items-center">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-secondary hover:underline"
          >
            Read Full Article
          </a>

          <button
            onClick={handleViewArticle}
            className="cursor-pointer px-4 py-2 bg-accent text-white rounded-md hover:bg-green-700 transition text-sm font-medium"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
