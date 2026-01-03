// Newsletter subscription routes
import { RequestHandler } from "express";
import { prisma } from "../db";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const subscribe: RequestHandler = async (req, res) => {
  try {
    const { email } = subscribeSchema.parse(req.body);

    // Check if email already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingSubscriber) {
      // Return success even if already subscribed (better UX)
      return res.json({
        success: true,
        message: "You're already subscribed!",
        alreadySubscribed: true,
      });
    }

    // Create new subscriber
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase().trim(),
      },
    });

    res.json({
      success: true,
      message: "Successfully subscribed to newsletter!",
      subscriber: {
        id: subscriber.id,
        email: subscriber.email,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: error.errors[0].message 
      });
    }
    console.error("Newsletter subscription error:", error);
    res.status(500).json({ 
      error: "Failed to subscribe. Please try again later." 
    });
  }
};
