// Development server with hot reload
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { connectDatabase } from "./db";
import { requireAuth } from "./middleware/auth";
import * as authRoutes from "./routes/auth";
import * as blogRoutes from "./routes/blog";

// Load environment variables
dotenv.config();

export async function createDevServer() {
  // Connect to database
  await connectDatabase();

  const app = express();

  // CORS configuration
  app.use(cors());

  // Parse JSON bodies
  app.use(express.json());

  // Create Vite dev server
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  // Use Vite's connect instance as middleware
  app.use(vite.middlewares);

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

  // Use Vite middleware for all other routes (SPA)
  app.use("*", async (req, res, next) => {
    try {
      // Skip API routes
      if (req.originalUrl.startsWith("/api/")) {
        return next();
      }

      // Let Vite handle the request
      const template = await vite.transformIndexHtml(req.originalUrl, "");
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  return app;
}

