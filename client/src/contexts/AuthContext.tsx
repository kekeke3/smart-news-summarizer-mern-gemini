// client/src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  loginAndMergeArticles,
  logout as apiLogout,
  getSavedArticles,
} from "../utils/storage";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  mergeGuestArticles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const userId = localStorage.getItem("userId");
    const userData = localStorage.getItem("userData");

    if (userId && userData) {
      setUser(JSON.parse(userData));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - replace with real API call
      const mockUser = {
        id: `user_${Date.now()}`,
        email,
        name: email.split("@")[0],
      };

      // In reality, you'd call your backend here
      // const response = await axios.post('/api/auth/login', { email, password });
      // const { user, token } = response.data;

      const token = "mock-token-for-now";

      // Merge guest articles to user account
      await loginAndMergeArticles(mockUser.id, token);

      // Set user data
      setUser(mockUser);
      localStorage.setItem("userId", mockUser.id);
      localStorage.setItem("userData", JSON.stringify(mockUser));
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock registration - replace with real API call
      const mockUser = {
        id: `user_${Date.now()}`,
        email,
        name,
      };

      const token = "mock-token-for-now";

      // No need to merge articles for new users

      // Set user data
      setUser(mockUser);
      localStorage.setItem("userId", mockUser.id);
      localStorage.setItem("userData", JSON.stringify(mockUser));
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const mergeGuestArticles = async () => {
    if (!user) return;
    await loginAndMergeArticles(user.id, localStorage.getItem("token") || "");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest: !user,
        isLoading,
        login,
        register,
        logout,
        mergeGuestArticles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
