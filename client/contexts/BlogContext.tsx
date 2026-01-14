import React, { createContext, useContext, useState, useEffect } from "react";
import { BlogPost, BlogPostsResponse, ErrorResponse } from "@shared/api";
import { apiFetch } from "../lib/api";

interface BlogContextType {
  posts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  addPost: (post: Omit<BlogPost, "id">) => Promise<boolean>;
  updatePost: (id: string, post: Omit<BlogPost, "id">) => Promise<boolean>;
  deletePost: (id: string) => Promise<boolean>;
  getPostById: (id: string) => BlogPost | undefined;
  refreshPosts: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = "herstory-auth-token";

// Helper function to get auth token
function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

// Helper function to get auth headers
function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load posts from API on mount
  useEffect(() => {
    refreshPosts();
  }, []);

  const refreshPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiFetch("/api/blog");
      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || "Failed to fetch posts");
      }
      const data: BlogPostsResponse = await response.json();
      setPosts(data.posts);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load posts";
      setError(errorMessage);
      console.error("Error loading posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addPost = async (post: Omit<BlogPost, "id">): Promise<boolean> => {
    try {
      const response = await apiFetch("/api/blog", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      const newPost: BlogPost = await response.json();
      setPosts([newPost, ...posts]);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create post";
      setError(errorMessage);
      console.error("Error creating post:", err);
      return false;
    }
  };

  const updatePost = async (id: string, post: Omit<BlogPost, "id">): Promise<boolean> => {
    try {
      const response = await apiFetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || "Failed to update post");
      }

      const updatedPost: BlogPost = await response.json();
      setPosts(posts.map((p) => (p.id === id ? updatedPost : p)));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update post";
      setError(errorMessage);
      console.error("Error updating post:", err);
      return false;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      const response = await apiFetch(`/api/blog/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.error || "Failed to delete post");
      }

      setPosts(posts.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete post";
      setError(errorMessage);
      console.error("Error deleting post:", err);
      return false;
    }
  };

  const getPostById = (id: string) => {
    return posts.find((p) => p.id === id);
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        isLoading,
        error,
        addPost,
        updatePost,
        deletePost,
        getPostById,
        refreshPosts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
}
