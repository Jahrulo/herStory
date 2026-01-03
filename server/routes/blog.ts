// Blog post routes
import { RequestHandler } from "express";
import { prisma } from "../db";
import { z } from "zod";

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  theme: z.string().min(1, "Theme is required"),
  author: z.string().min(1, "Author is required"),
});

// GET /api/blog - Get all blog posts
export const getPosts: RequestHandler = async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { date: "desc" },
    });

    // Convert date to string format for client
    const formattedPosts = posts.map((post) => ({
      ...post,
      date: post.date.toISOString().split("T")[0],
    }));

    res.json({ posts: formattedPosts });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// GET /api/blog/:id - Get single blog post
export const getPostById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({
      ...post,
      date: post.date.toISOString().split("T")[0],
    });
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

// POST /api/blog - Create new blog post (protected)
export const createPost: RequestHandler = async (req, res) => {
  try {
    const data = blogPostSchema.parse(req.body);

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        date: new Date(data.date),
        theme: data.theme,
        author: data.author,
      },
    });

    res.status(201).json({
      ...post,
      date: post.date.toISOString().split("T")[0],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Create post error:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

// PUT /api/blog/:id - Update blog post (protected)
export const updatePost: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = blogPostSchema.parse(req.body);

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        date: new Date(data.date),
        theme: data.theme,
        author: data.author,
      },
    });

    res.json({
      ...post,
      date: post.date.toISOString().split("T")[0],
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return res.status(404).json({ error: "Post not found" });
    }
    console.error("Update post error:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

// DELETE /api/blog/:id - Delete blog post (protected)
export const deletePost: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.blogPost.delete({
      where: { id },
    });

    res.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
      return res.status(404).json({ error: "Post not found" });
    }
    console.error("Delete post error:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

