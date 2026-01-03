// Database seeding script - creates initial admin user
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "password123";

  // Check if admin already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: adminUsername },
  });

  if (existingAdmin) {
    console.log(`✅ Admin user "${adminUsername}" already exists`);
  } else {
    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        username: adminUsername,
        password: hashedPassword,
      },
    });

    console.log(`✅ Created admin user: ${admin.username}`);
    console.log(`   Username: ${adminUsername}`);
    console.log(`   Password: ${adminPassword}`);
  }

  // Optionally seed sample blog posts
  const seedPosts = process.env.SEED_POSTS === "true";
  if (seedPosts) {
    const existingPosts = await prisma.blogPost.count();
    if (existingPosts === 0) {
      await prisma.blogPost.createMany({
        data: [
          {
            title: "Feminist Journeys: Reclaiming My Voice",
            excerpt:
              "Exploring what it means to find your voice as a woman in law and storytelling.",
            content: `Feminist journeys are not linear. They are messy, beautiful, and deeply personal. 

When I first stepped into law school, I was told to make my voice smaller, to sit with the discomfort, to wait my turn. But what I learned in those hallways, in courtrooms, and in conversations with other women, was that our voices are not a privilege—they are a right.

This essay is about reclaiming that voice. It's about the small moments of resistance, the conversations I had with friends at midnight, the books that changed how I see the world, and the women who showed me what feminist agency looks like.

Feminist agency is not just about grand gestures. It's about the everyday revolutions. It's about saying "no" when you want to. It's about honoring your body, your time, and your boundaries. It's about refusing to shrink.

For women, especially women from Africa, this journey is complicated by layers of expectation—cultural, familial, professional. But I have learned that our complexity is our strength. The contradictions we hold—the lawyer and the storyteller, the professional and the vulnerable, the angry and the hopeful—these are not contradictions. They are fullness.

This piece invites you to reflect on your own journey. Where have you been told to shrink? What would it look like to take up space?`,
            date: new Date("2025-01-15"),
            theme: "Feminist journeys",
            author: "Henrietta Marie Foray",
          },
          {
            title: "Tech & Gender: Who Gets to Build the Future?",
            excerpt:
              "How technology reproduces gender inequities and what we must do about it.",
            content: `Technology is not neutral. The code we write, the algorithms we design, the platforms we build—they all carry the imprints of our biases, our assumptions, and our power.

When we talk about tech and gender, we must ask: Who is building? Whose problems are we solving? Whose voices are we amplifying or silencing?

In Africa, technology is often framed as salvation. But for women, technology can be a tool of surveillance, a mechanism of control, a space where misogyny finds new forms of expression. I have seen women's labor be extracted through digital platforms. I have watched algorithms deny women access to credit, to information, to justice.

But technology can also be liberatory. It can connect us across boundaries. It can amplify our stories. It can help us organize. The question is: How do we build technology that centers women's freedom, autonomy, and dignity?

This essay argues for feminist technologists—women and non-binary people who are not just users of technology but builders of it. We need women in the rooms where decisions are made about data, about privacy, about the future of our digital lives.

The future is not predetermined. It is being built right now, line by line, decision by decision. We must insist on building it differently.`,
            date: new Date("2025-01-08"),
            theme: "Tech, law & policy",
            author: "Henrietta Marie Foray",
          },
        ],
      });
      console.log("✅ Seeded sample blog posts");
    } else {
      console.log("ℹ️  Blog posts already exist, skipping seed");
    }
  }

  console.log("✨ Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

