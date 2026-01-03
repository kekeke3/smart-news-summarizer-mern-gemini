// client/src/components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { logout } from "../utils/storage";

const Navbar = () => {
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isLoggedIn = localStorage.getItem("userId") !== null;
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : null;

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const handleLogin = (userData: any) => {
    // Store user data
    localStorage.setItem("userId", userData.id);
    localStorage.setItem("userData", JSON.stringify(userData));

    // For demo, generate a mock token
    localStorage.setItem("token", `demo_token_${Date.now()}`);

    // Refresh to update UI
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    window.location.reload(); // Refresh to update UI
  };

  return (
    <>
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

          <nav className="hidden md:flex space-x-6 items-center">
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
              Saved Articles
            </Link>

            {/* User section */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="text-gray-200">{user?.name || "User"}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-4 py-1 bg-primary hover:bg-primary-dark rounded-md text-sm transition"
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile menu */}
          <div className="flex items-center gap-4 md:hidden">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded-md text-xs"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-3 py-1 bg-primary hover:bg-primary-dark rounded-md text-sm"
              >
                Sign In
              </button>
            )}
            <button className="text-white">
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
        </div>
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Navbar;
