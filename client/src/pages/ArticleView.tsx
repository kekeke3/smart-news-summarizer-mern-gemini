// src/pages/ArticleView.tsx
import { useLocation, useNavigate } from "react-router-dom";
import type { Article } from "../types/news";
import SummaryModal from "../components/SummaryModal";
import { useState } from "react";

const ArticleView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article as Article;
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  if (!article) {
    return <div>Article not found</div>;
  }

  const handleAskQuestion = async () => {
    // Implement your question answering API call here
    try {
      // const response = await fetchQuestionAnswer(article.url, question);
      // setAnswer(response.answer);
      setAnswer(
        "This is a simulated answer. Connect to your question-answering API to get real responses."
      );
    } catch (error) {
      console.error("Error getting answer:", error);
      setAnswer("Failed to get answer. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-primary hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to News
      </button>

      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <h1 className="text-3xl font-bold text-dark mb-4 p-6 pb-0">
          {article.title}
        </h1>

        <div className="flex items-center text-sm text-gray-500 px-6">
          <span className="font-medium text-primary mr-2">
            {article.source?.name}
          </span>
          <span className="mx-2">•</span>
          <span>
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-96 object-cover mt-4"
          />
        )}

        <div className="p-6">
          <p className="text-lg text-gray-700 mb-6">{article.description}</p>
          <div className="prose max-w-none">
            <p className="text-gray-800">{article.content}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedArticle(article)}
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition font-medium"
            >
              Summarize Article
            </button>
            <button
              onClick={() => setShowQuestionInput(!showQuestionInput)}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
            >
              Ask Questions
            </button>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition font-medium"
            >
              View Original
            </a>
          </div>

          {showQuestionInput && (
            <div className="mt-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question about this article..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleAskQuestion}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Ask
                </button>
              </div>
              {answer && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-bold mb-2">Answer:</h4>
                  <p>{answer}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </article>

      {selectedArticle && (
        <SummaryModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default ArticleView;
