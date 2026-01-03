// Development server entry point
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./db";
import { requireAuth } from "./middleware/auth";
import * as authRoutes from "./routes/auth";
import * as blogRoutes from "./routes/blog";

// Load environment variables
dotenv.config();

async function startDevServer() {
  // Connect to database
  await connectDatabase();

  const app = express();
  const port = process.env.SERVER_PORT || 3001;

  // CORS configuration
  app.use(cors());

  // Parse JSON bodies
  app.use(express.json());

  // Health check routes
  app.get("/api/ping", (req, res) => {
    res.json({ message: "pong" });
  });

  app.get("/api/demo", (req, res) => {
    res.json({ message: "Hello from the server!" });
  });

  // Authentication routes
  app.post("/api/auth/login", authRoutes.login);
  app.get("/api/auth/verify", requireAuth, authRoutes.verify);

  // Blog routes
  app.get("/api/blog", blogRoutes.getPosts);
  app.get("/api/blog/:id", blogRoutes.getPostById);
  app.post("/api/blog", requireAuth, blogRoutes.createPost);
  app.put("/api/blog/:id", requireAuth, blogRoutes.updatePost);
  app.delete("/api/blog/:id", requireAuth, blogRoutes.deletePost);

  app.listen(port, () => {
    console.log(`🚀 API server running on http://localhost:${port}`);
  });
}

startDevServer().catch((error) => {
  console.error("Failed to start dev server:", error);
  process.exit(1);
});

