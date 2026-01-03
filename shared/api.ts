// Shared API types for client and server

export interface DemoResponse {
  message: string;
}

// Blog Post types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  theme: string;
  author: string;
}

// Auth types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export interface VerifyResponse {
  success: boolean;
  user: {
    id: string;
    username: string;
  };
}

// Blog API responses
export interface BlogPostsResponse {
  posts: BlogPost[];
}

export interface BlogPostResponse extends BlogPost {}

export interface ErrorResponse {
  error: string;
}
