import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-primary/10 p-6 rounded-full mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-dark mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition font-medium"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
