import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import CategorySelector from "../components/CategorySelector";
import SearchBar from "../components/SearchBar";
import ContentScopeSelector from "../components/ContentScopeSelector";
import { fetchEverythingNews, fetchTopHeadlinesNews } from "../api/newsApi";
import type { Article } from "../types/news";

const ARTICLES_PER_PAGE = 20; // matches backend pageSize

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedContentScope, setSelectedContentScope] = useState<
    "everything" | "top-headlines"
  >("everything");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      setCurrentPage(1);

      try {
        const data =
          selectedContentScope === "everything"
            ? await fetchEverythingNews({
                q: searchQuery || undefined,
                page: 1,
              })
            : await fetchTopHeadlinesNews({
                q: searchQuery || undefined,
                category: selectedCategory,
                page: 1,
              });

        if (!Array.isArray(data.articles)) {
          throw new Error("Invalid response format");
        }

        setArticles(data.articles);
        setTotalResults(data.totalResults || 0);
      } catch (err: unknown) {
        console.error("Error fetching news:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch news");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, selectedContentScope, searchQuery]);

  const loadMoreArticles = async (page: number) => {
    setIsLoading(true);

    try {
      const data =
        selectedContentScope === "everything"
          ? await fetchEverythingNews({
              q: searchQuery || undefined,
              page,
            })
          : await fetchTopHeadlinesNews({
              q: searchQuery || undefined,
              category: selectedCategory,
              page,
            });

      if (!Array.isArray(data.articles)) {
        throw new Error("Invalid response format");
      }

      setArticles((prev) => [...prev, ...data.articles]);
      setCurrentPage(page);
    } catch (err: unknown) {
      console.error("Error fetching news:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch news");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalResults / ARTICLES_PER_PAGE)) {
      loadMoreArticles(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      loadMoreArticles(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(totalResults / ARTICLES_PER_PAGE);
  const showingStart = (currentPage - 1) * ARTICLES_PER_PAGE + 1;
  const showingEnd = Math.min(currentPage * ARTICLES_PER_PAGE, totalResults);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">Today&apos;s News</h1>
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600 text-lg mt-12">⚠️ {error}</div>
      ) : articles.length === 0 ? (
        <div className="text-center text-gray-500 mt-12">
          No articles found.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-8">
            <div className="text-sm text-gray-600">
              Showing {showingStart}-{showingEnd} of {totalResults}
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
    </div>
  );
};

export default HomePage;
