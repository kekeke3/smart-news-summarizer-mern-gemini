import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import CategorySelector from "../components/CategorySelector";
import SearchBar from "../components/SearchBar";
import SummaryModal from "../components/SummaryModal";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch news articles
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call
        const mockData = [
          {
            id: "1",
            title: "Example News Article 1",
            description:
              "This is a sample news article description that would be summarized by Gemini AI.",
            source: "Example News",
            publishedAt: new Date().toISOString(),
            imageUrl: "https://via.placeholder.com/300x200",
            url: "#",
          },
          {
            id: "2",
            title: "Example News Article 2",
            description:
              "Another sample news article that demonstrates the summary functionality.",
            source: "Sample News",
            publishedAt: new Date().toISOString(),
            imageUrl: "https://via.placeholder.com/300x200",
            url: "#",
          },
        ];
        setArticles(mockData);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory, searchQuery]);

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
          <CategorySelector
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onSummarize={() => setSelectedArticle(article)}
            />
          ))}
        </div>
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
