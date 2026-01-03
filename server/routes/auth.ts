// Authentication routes
import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db";
import { generateToken } from "../middleware/auth";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const login: RequestHandler = async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    // Find admin user
    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(admin.id);

    res.json({
      success: true,
      token,
      user: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verify: RequestHandler = async (req, res) => {
  try {
    // This endpoint is protected by requireAuth middleware
    // If we reach here, the token is valid
    const userId = (req as any).userId;

    const admin = await prisma.admin.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
      },
    });

    if (!admin) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      user: admin,
    });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

