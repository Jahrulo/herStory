// Database seeding script - creates initial admin user
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  const adminUsername = process.env.ADMIN_USERNAME || "henrietta";
  const adminPassword = process.env.ADMIN_PASSWORD || "herstory@2026";

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

  // Seed blog posts (10 posts covering all themes)
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
          date: new Date("2025-01-20"),
          theme: "Feminist journeys",
          author: "Henrietta Marie Foray",
        },
        {
          title: "Bodily Autonomy and the Law: Beyond Reproductive Rights",
          excerpt:
            "True autonomy means control over our bodies in all contexts—from healthcare to work to public space.",
          content: `When we talk about bodily autonomy, we often narrow the conversation to reproductive rights. But autonomy is not a single issue. It is the foundation of our personhood, our dignity, our right to exist fully in our bodies.

I have represented women whose bodies became battlegrounds—in the workplace, in their homes, in the streets. I have seen how the law can either protect or violate our right to determine what happens to our bodies. Too often, it does both.

Bodily autonomy means the right to choose what you wear, how you move, who touches you, and when. It means the right to medical decisions without coercion. It means the right to work without harassment. It means the right to exist in public space without being reduced to your body.

In many African legal contexts, these rights are still contested. Cultural norms, religious frameworks, and patriarchal interpretations of law continue to constrain women's bodily autonomy. But law can also be a tool of liberation. When we center autonomy as a fundamental right, we challenge the structures that seek to control us.

This is not just legal theory. This is about real women making real choices about their real bodies. And the law must catch up.`,
          date: new Date("2025-01-18"),
          theme: "Women's rights & autonomy",
          author: "Henrietta Marie Foray",
        },
        {
          title:
            "Breaking the Binary: Gender as Spectrum, Not Spectrum of Restriction",
          excerpt:
            "Reflecting on how rigid gender categories limit us all and what it means to see gender differently.",
          content: `I used to think gender was simple. You were a woman or you weren't. But the more I listened, the more I learned, the more I understood that gender is not a binary—it's a spectrum of human expression, and the categories we've built around it are prisons.

Working in law, I've seen how gender categories are not just descriptions—they are prescriptions. They determine what you can wear, where you can go, who you can love, what rights you have. They become tools of exclusion and violence.

But gender is so much more fluid, so much more complex than our legal frameworks allow. I've learned this from friends, from clients, from my own evolving understanding of myself. Gender is not just identity—it's expression, it's performance, it's a relationship with the world.

For women, especially, gender categories have been used to constrain. "Act like a lady" means don't be too loud, don't be too ambitious, don't take up too much space. But what if we refused these constraints? What if we built legal and social frameworks that honored the full spectrum of human gender expression?

This reflection is an invitation to think beyond the binary. To see gender not as limitation but as possibility. To build a world where everyone gets to define themselves, on their own terms.`,
          date: new Date("2025-01-15"),
          theme: "Gender reflections",
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
          date: new Date("2025-01-12"),
          theme: "Tech, law & policy",
          author: "Henrietta Marie Foray",
        },
        {
          title: "Data Privacy Laws in Africa: A Feminist Perspective",
          excerpt:
            "How data protection frameworks must center women's safety and autonomy in the digital age.",
          content: `As data privacy laws emerge across Africa, we must ask: Who do these laws protect? Whose data is considered valuable? Whose privacy is recognized as a right?

From a feminist perspective, privacy is not just about corporate surveillance—it's about safety, autonomy, and the right to exist without being tracked, monitored, or exploited. For women, digital privacy violations can lead to stalking, harassment, intimate partner violence, and professional retaliation.

Current data protection frameworks often fail to account for these gender-specific harms. They focus on consent models that ignore power imbalances. They prioritize commercial interests over individual safety. They treat privacy as a luxury rather than a necessity for women's full participation in digital life.

We need data privacy laws that recognize how data collection disproportionately affects marginalized groups. We need frameworks that give women control over their digital footprint, that protect survivors of violence, that prevent digital surveillance from becoming a tool of oppression.

This is not just about regulation—it's about reimagining what privacy means in a world where our data is constantly extracted. For women, privacy is survival.`,
          date: new Date("2025-01-10"),
          theme: "Tech, law & policy",
          author: "Henrietta Marie Foray",
        },
        {
          title: "The Art of No: Boundaries as Revolutionary Practice",
          excerpt:
            "Learning to set boundaries is not selfishness—it's a radical act of self-preservation in a world that demands everything from women.",
          content: `I spent years saying yes when I meant no. Yes to extra work, yes to uncomfortable conversations, yes to relationships that drained me, yes to professional opportunities that cost me my peace. I thought this was what women did—we gave until there was nothing left, and then we gave more.

But boundaries are not walls. They are not rejection. They are love letters to yourself. They are the lines you draw around your time, your energy, your body, your spirit—not to keep people out, but to keep yourself in.

Learning to say no has been my most important feminist practice. It has cost me opportunities, relationships, approval. But it has given me something more valuable: myself.

In a world that teaches women to be endlessly available, setting boundaries is revolutionary. It challenges the expectation that we exist to serve others. It asserts that our needs matter. It models for other women that it's okay to take up space, to have limits, to rest.

Healing is not just about processing trauma—it's about building a life that doesn't require constant recovery. Boundaries are the architecture of that life. They create the conditions where we can thrive, not just survive.

This essay is for every woman who has been called difficult for having limits, selfish for protecting her peace, unreasonable for wanting respect. Your boundaries are valid. Your no is complete. Your healing is your right.`,
          date: new Date("2025-01-08"),
          theme: "Healing & boundaries",
          author: "Henrietta Marie Foray",
        },
        {
          title: "Desire on Our Own Terms: Reclaiming Erotic Autonomy",
          excerpt:
            "Exploring how women's desire has been policed, shamed, and commodified—and what it means to claim it back.",
          content: `Women's desire has always been a problem for patriarchy. Too much desire makes us dangerous. Too little makes us broken. The right kind of desire—directed at the right people, expressed in the right ways—keeps us in our place.

But desire doesn't follow rules. It doesn't fit into neat categories. It doesn't care about what we're supposed to want. I've learned that my desire is mine—not something to be managed, policed, or explained away.

For women, especially women of color, desire is often seen through layers of racism and respectability politics. We're either hypersexualized or desexualized. We're either too much or not enough. Our desire becomes something that happens to us, not something we claim.

But what if we reclaimed it? What if we saw desire as a source of power, of knowledge, of connection to ourselves? What if we stopped asking whether our desires are appropriate and started asking whether they're authentic?

This is not about performing desire for others. It's about discovering what actually moves you, what actually connects you to yourself and to others. It's about erotic autonomy—the right to want what you want, on your own terms.

Love, desire, womanhood—these are not fixed categories. They are sites of possibility, of becoming, of freedom. This essay is an invitation to explore them fully, without apology.`,
          date: new Date("2025-01-05"),
          theme: "Love, desire & womanhood",
          author: "Henrietta Marie Foray",
        },
        {
          title: "When Love Hurts: Legal Protections and the Limits of Law",
          excerpt:
            "The law can protect us from violence, but it cannot heal the wounds of love that was supposed to be safe.",
          content: `I've represented women leaving abusive relationships, and I've learned this: the law can give you a restraining order, it can help you leave, it can punish your abuser. But it cannot heal the betrayal of love that was supposed to be safe.

Intimate partner violence is not just physical—it's the systematic destruction of your sense of self, your trust in your own judgment, your ability to imagine safety. The law addresses the symptoms, but the wounds run deeper.

For women in Africa, leaving an abusive relationship is complicated by economic dependence, cultural expectations, family pressure, and legal systems that may not fully recognize psychological abuse. The law is necessary but insufficient.

Healing requires community. It requires therapy. It requires time. It requires the radical act of learning to trust yourself again, to believe that you deserve love that doesn't hurt, that doesn't control, that doesn't diminish you.

This piece is about both—the legal protections we need and the healing we deserve. It's about building support systems that go beyond the courtroom, that honor the full complexity of leaving, of healing, of learning to love again when you're ready.

Love should never require recovery. But if it does, you deserve the resources to heal, and the space to do it on your own timeline.`,
          date: new Date("2025-01-03"),
          theme: "Love, desire & womanhood",
          author: "Henrietta Marie Foray",
        },
        {
          title: "Representation Is Not Enough: Beyond Symbolic Politics",
          excerpt:
            "Having women in power matters, but only if they use that power to transform structures, not just occupy them.",
          content: `We are often told that representation is the goal. If we can just get more women in positions of power, things will change. But I've learned that representation without transformation is just another form of exclusion.

I've seen women in power who use their position to maintain the status quo, who distance themselves from other women, who become gatekeepers rather than door-openers. I've seen how power can isolate, how it can corrupt, how it can make you forget where you came from.

True feminist politics is not about getting individual women into positions of power. It's about transforming what power means, how it's distributed, who gets to exercise it, and in whose interests.

This means challenging not just who has power, but how power works. It means building coalitions, centering the most marginalized, refusing to accept crumbs of inclusion. It means understanding that our freedom is bound up together—we cannot be free while others are oppressed.

For women in Africa, this is especially urgent. We need leaders who understand that power is not a personal possession but a collective resource. We need politics that centers care, that prioritizes justice, that refuses to sacrifice the many for the few.

Representation is a starting point, not an end point. The real work is transformation.`,
          date: new Date("2025-01-01"),
          theme: "Power, politics & identity",
          author: "Henrietta Marie Foray",
        },
        {
          title: "Economic Justice as Gender Justice: Beyond Equal Pay",
          excerpt:
            "True economic justice requires addressing the structural inequalities that keep women in poverty, regardless of how much we're paid.",
          content: `We often frame economic justice for women as a matter of equal pay. But pay equity, while important, is only one piece of a much larger puzzle. True economic justice requires addressing the entire structure of our economy—who does unpaid labor, who has access to capital, who owns property, who can accumulate wealth.

For women in Africa, economic inequality is shaped by multiple intersecting factors: gender, race, class, geography, education, marital status, disability. We cannot address economic injustice by focusing on a single axis of oppression.

The unpaid care work that women perform—cooking, cleaning, child-rearing, elder care—is the foundation of our economy, yet it's treated as invisible, valueless. Women's economic participation is constrained by this invisible labor, by lack of access to credit, by property laws that favor men, by cultural norms that limit our mobility.

Economic justice requires redistributing not just income, but power. It requires recognizing and compensating care work. It requires challenging the extractive systems that profit from women's labor while keeping us in poverty. It requires building alternative economic models that center human dignity over profit.

This is not just about women getting paid more. It's about transforming an economic system that was built on our exploitation. It's about creating a world where everyone has what they need to thrive, not just survive.

Social justice narratives must center economic transformation. Because without economic justice, there is no gender justice. Without economic justice, there is no justice at all.`,
          date: new Date("2024-12-28"),
          theme: "Social justice narratives",
          author: "Henrietta Marie Foray",
        },
      ],
    });
    console.log("✅ Seeded 10 blog posts covering all themes");
  } else {
    console.log(`ℹ️  ${existingPosts} blog posts already exist, skipping seed`);
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
