import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // Helper function to check if route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="text-xl font-bold">SmartNews</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className={`transition ${
              isActive("/") ? "text-accent" : "hover:text-accent"
            }`}
          >
            Home
          </Link>
          <Link
            to="/saved"
            className={`transition ${
              isActive("/saved") ? "text-accent" : "hover:text-accent"
            }`}
          >
            Saved Summaries
          </Link>
        </nav>

        <button className="md:hidden text-white">
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
