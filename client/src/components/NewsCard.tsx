import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveArticle, unsaveArticle, isArticleSaved } from "../utils/storage";
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";

const NewsCard = ({ article, showSaveButton = true }: any) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(isArticleSaved(article));

  const handleViewArticle = () => {
    navigate("/article", { state: { article } });
  };

  const handleSaveArticle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click when saving
    if (isSaved) {
      unsaveArticle(article);
    } else {
      saveArticle(article);
    }
    setIsSaved(!isSaved);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition relative">
      {/* Floating save button */}
      {showSaveButton && (
        <button
          onClick={handleSaveArticle}
          className="cursor-pointer absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-all"
          aria-label={isSaved ? "Unsave article" : "Save article"}
        >
          {isSaved ? (
            <BookmarkSolid className="w-5 h-5 text-blue-500" />
          ) : (
            <BookmarkOutline className="w-5 h-5 text-gray-600" />
          )}
        </button>
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
