import { useNavigate } from "react-router-dom";

const NewsCard = ({ article, onSummarize }: any) => {
  const navigate = useNavigate();

  const handleViewArticle = () => {
    navigate("/article", { state: { article } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={handleViewArticle}
        />
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-primary">
            {article.source.name}
          </span>
          <span className="text-sm font-medium text-primary">
            {article.source.url}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>
        {/*   <div>
          <img
            className="w-full h-40 max-h-40 object-cover mb-1"
            src={article.urlToImage}
            alt=""
          />
        </div> */}
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
