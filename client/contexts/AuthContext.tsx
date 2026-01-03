import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { LoginRequest, LoginResponse, VerifyResponse } from "@shared/api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = "herstory-auth-token";
const REQUEST_TIMEOUT = 10000; // 10 seconds

// Helper function to decode JWT token (without verification, just to check expiry)
function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;
    
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return true;
    
    // Check if token expires in less than 1 minute (give some buffer)
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();
    return expirationTime - currentTime < 60000; // Less than 1 minute remaining
  } catch {
    return true;
  }
}

// Fetch with timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = REQUEST_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout. Please check your connection.");
    }
    throw error;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  // Verify token on mount
  useEffect(() => {
    verifyAuth();
    
    // Set up periodic token check (every 5 minutes)
    const checkInterval = setInterval(() => {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token && isTokenExpired(token)) {
        logout();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(checkInterval);
  }, [logout]);

  const verifyAuth = async () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }

    // Check if token is expired before making API call
    if (isTokenExpired(token)) {
      logout();
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetchWithTimeout("/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setError(null);
      } else {
        // Token is invalid, remove it
        logout();
      }
    } catch (error) {
      console.error("Auth verification error:", error);
      // Only clear token if it's a 401 (unauthorized), not network errors
      // Network errors should be retried
      if (error instanceof Error && !error.message.includes("timeout") && !error.message.includes("Failed to fetch")) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setError(null);
    
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return false;
    }

    try {
      const request: LoginRequest = { username, password };
      const response = await fetchWithTimeout("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Login failed" }));
        const errorMessage = errorData.error || "Invalid credentials. Please try again.";
        setError(errorMessage);
        return false;
      }

      const data: LoginResponse = await response.json();
      
      if (!data.token) {
        setError("Invalid response from server");
        return false;
      }

      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      setIsAuthenticated(true);
      setError(null);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Network error. Please check your connection and try again.";
      setError(errorMessage);
      console.error("Login error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
