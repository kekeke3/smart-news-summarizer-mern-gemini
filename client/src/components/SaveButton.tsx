// client/src/components/SaveButton.tsx
import { useState, useEffect } from "react";
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { saveArticle, unsaveArticle, isArticleSaved } from "../utils/storage";

interface SaveButtonProps {
  article: any;
  size?: "sm" | "md" | "lg";
  onLoginRequest?: () => void; // Add this prop
}

const SaveButton: React.FC<SaveButtonProps> = ({
  article,
  size = "md",
  onLoginRequest,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check saved status on mount
  useEffect(() => {
    const checkSaved = async () => {
      const saved = await isArticleSaved(article);
      setIsSaved(saved);
    };
    checkSaved();
  }, [article]);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isSaved) {
        await unsaveArticle(article);
        setIsSaved(false);
      } else {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem("userId") !== null;

        if (!isLoggedIn && onLoginRequest) {
          // Trigger login request
          onLoginRequest();
          return;
        }

        await saveArticle(article);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error toggling save:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`cursor-pointer ${sizeClasses[size]} bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-all disabled:opacity-50`}
      aria-label={isSaved ? "Unsave article" : "Save article"}
    >
      {isSaved ? (
        <BookmarkSolid className={`${iconSizes[size]} text-blue-500`} />
      ) : (
        <BookmarkOutline className={`${iconSizes[size]} text-gray-600`} />
      )}
    </button>
  );
};

export default SaveButton;
