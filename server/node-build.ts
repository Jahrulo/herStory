// Server entry point for production build
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";
import dotenv from "dotenv";
import { connectDatabase } from "./db";
import { requireAuth } from "./middleware/auth";
import * as authRoutes from "./routes/auth";
import * as blogRoutes from "./routes/blog";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function createServer() {
  const app = express();

  // Connect to database
  await connectDatabase();

  // CORS configuration
  // Allow requests from Vercel or other origins if specified
  const allowedOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
    : '*';
  
  const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
  };
  app.use(cors(corsOptions));

  // Parse JSON bodies
  app.use(express.json());

  // Serve static files from the SPA build
  const spaPath = join(__dirname, "../spa");
  app.use(express.static(spaPath));

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

  // SPA fallback - serve index.html for all non-API routes
  app.use((req, res, next) => {
    // Skip API routes
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ error: "Not found" });
    }

    // Only handle GET requests for the SPA
    if (req.method !== "GET") {
      return next();
    }

    try {
      const indexHtml = readFileSync(join(spaPath, "index.html"), "utf-8");
      res.setHeader("Content-Type", "text/html");
      res.send(indexHtml);
    } catch (error) {
      res.status(500).send("Error serving application");
    }
  });

  return app;
}

// Start server - this file is the entry point for production
const port = process.env.PORT || 8080;
createServer()
  .then((app) => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
