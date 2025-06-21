import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import CategorySelector from "../components/CategorySelector";
import SearchBar from "../components/SearchBar";
import SummaryModal from "../components/SummaryModal";
import { fetchTopHeadlinesNews, fetchEverythingNews } from "../api/newsApi";
import type { Article } from "../types/news";
import ContentScopeSelector from "../components/ContentScopeSelector";

const ARTICLES_PER_PAGE = 6; // You can adjust this number

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedContentScope, setSelectedContentScope] =
    useState("everything");
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // 🚨 Error state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null); // Reset error on new fetch
      setCurrentPage(1); // Reset to first page when filters change

      try {
        let response;
        if (selectedContentScope === "everything") {
          response = await fetchEverythingNews({
            q: searchQuery || undefined,
            page: 1,
          });
        } else {
          console.log(selectedCategory);
          response = await fetchTopHeadlinesNews({
            q: searchQuery || undefined,
            category: selectedCategory,
            page: 1,
          });
        }

        if (
          !response ||
          !response.data ||
          !Array.isArray(response.data.articles)
        ) {
          throw new Error("Invalid response format");
        }
        setArticles(response.data.articles);
        setTotalResults(response.data.totalResults || 0);
      } catch (err: any) {
        console.error("Error fetching news:", err);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong while fetching news."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, selectedContentScope, searchQuery]);

  const loadMoreArticles = async (page: number) => {
    setIsLoading(true);
    try {
      let response;
      if (selectedContentScope === "everything") {
        response = await fetchEverythingNews({
          q: searchQuery || undefined,
          page,
        });
      } else {
        response = await fetchTopHeadlinesNews({
          q: searchQuery || undefined,
          category: selectedCategory,
          page,
        });
      }

      if (!response?.data?.articles) {
        throw new Error("Invalid response format");
      }
      setArticles((prev) => [...prev, ...response.data.articles]);
      setCurrentPage(page);
    } catch (err: any) {
      console.error("Error fetching more news:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong while fetching more news."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    loadMoreArticles(nextPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      loadMoreArticles(prevPage);
    }
  };
  const totalPages = Math.ceil(totalResults / ARTICLES_PER_PAGE);
  const showingStart = (currentPage - 1) * ARTICLES_PER_PAGE + 1;
  const showingEnd = Math.min(currentPage * ARTICLES_PER_PAGE, totalResults);
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">Today's News</h1>
        <p className="text-gray-600">AI-powered summaries to save you time</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-3/4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="w-full md:w-1/4">
          <ContentScopeSelector
            selected={selectedContentScope}
            onChange={setSelectedContentScope}
          />
        </div>
        {selectedContentScope !== "everything" && (
          <div className="w-full md:w-1/4">
            <CategorySelector
              selected={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>
        )}
      </div>

      {isLoading && currentPage === 1 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 text-lg mt-12">⚠️ {error}</div>
      ) : articles.length === 0 ? (
        <div className="text-center text-gray-500 mt-12">
          No articles found. Try a different search or category.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard
                key={`${article.url}-${index}`} // Better key
                article={article}
                onSummarize={() => setSelectedArticle(article)}
              />
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex justify-between items-center mt-8">
            <div className="text-sm text-gray-600">
              Showing {showingStart}-{showingEnd} of {totalResults} articles
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1 || isLoading}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1 || isLoading
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages || isLoading}
                className={`px-4 py-2 rounded-md ${
                  currentPage >= totalPages || isLoading
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {selectedArticle && (
        <SummaryModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
