import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import LoadingSpinner from "../components/LoadingSpinner";

const CategoriesPage = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Format category name for display
  const formatCategoryName = (cat) => {
    return cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "All";
  };

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call filtered by category
        const mockData = [
          {
            id: "1",
            title: `${formatCategoryName(category)} News Example 1`,
            description: `This is an example of a ${category} news article that would be fetched from the API.`,
            source: "Example News",
            publishedAt: new Date().toISOString(),
            imageUrl: "https://via.placeholder.com/300x200",
            url: "#",
            category: category,
          },
          {
            id: "2",
            title: `${formatCategoryName(category)} News Example 2`,
            description: `Another example article in the ${category} category.`,
            source: "Sample News",
            publishedAt: new Date().toISOString(),
            imageUrl: "https://via.placeholder.com/300x200",
            url: "#",
            category: category,
          },
        ];
        setArticles(mockData);
      } catch (error) {
        console.error("Error fetching category news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryNews();
  }, [category]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">
          {formatCategoryName(category)} News
        </h1>
        <p className="text-gray-600">Latest {category} news summarized by AI</p>
      </div>

      {isLoading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onSummarize={() => {
                /* Implement modal open */
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
