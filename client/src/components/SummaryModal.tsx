// src/components/SummaryModal.tsx
import { useState, useEffect } from "react";
import { summarizeNews } from "../api/aiApi";

interface SummaryModalProps {
  article: {
    title: string;
    content: string;
    source?: { name: string };
    publishedAt: string;
    url: string;
  };
  onClose: () => void;
}

const SummaryModal = ({ article, onClose }: SummaryModalProps) => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const generateSummary = async () => {
      setIsLoading(true);
      setError("");
      try {
        const result = await summarizeNews({
          text: article.content || "",
          title: article.title,
        });

        if (result.success) {
          setSummary(result.data.summary);
        } else {
          setError(result.error || "Failed to generate summary");
        }
      } catch (err) {
        console.error("Error generating summary:", err);
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    generateSummary();
  }, [article]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-dark">AI Summary</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-dark transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-dark mb-2">
              {article.title}
            </h3>
            <p className="text-sm text-gray-500">
              {article.source?.name} •{" "}
              {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mb-4"></div>
              <p className="text-gray-600">Generating AI summary...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-gray-700 whitespace-pre-line">{summary}</p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Read full article
            </a>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
