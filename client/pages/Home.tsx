import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-deep-purple via-brand-purple to-brand-light-blue py-20 md:py-32 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-lg font-semibold text-brand-gold mb-2">
              Welcome to my digital home
            </p>
            <h1 className="text-5xl md:text-6xl font-bold font-montserrat mb-6 leading-tight">
              Embracing HERstory
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto text-gray-100">
              Amplifying women's voices, shaping narratives, and exploring the
              evolving intersection of law, technology, and gender justice.
            </p>
          </div>

          {/* Brand Identity */}
          <div className="bg-white/10 backdrop-blur rounded-lg p-8 mb-12 max-w-3xl mx-auto border border-white/20">
            <p className="text-center text-lg font-semibold mb-4">
              Legal practitioner | Feminist Storyteller | Tech & Gender Policy
              Enthusiast | Advocate
            </p>
            <p className="text-center text-gray-100 leading-relaxed">
              I'm a Sierra Leonean Lawyer, feminist Storyteller, and founder of
              Embracing HERstory, a storytelling platform dedicated to uplifting
              women's voices, reflections, and feminist journeys. My work focuses
              on how the law intersects with technology, policy, and gender and
              how we can use these tools to drive real social change. This space
              houses my professional journey, my writing, and my feminist
              storytelling blog, Embracing HERstory, where I amplify women's
              lived experiences and reflect on the complexities of gender, power,
              and identity.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-deep-purple font-montserrat mb-12">
            Let's Connect
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* CTA 1: Explore Work */}
            <Link
              to="/about"
              className="group bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow border-2 border-transparent hover:border-brand-purple text-center"
            >
              <div className="h-16 w-16 mx-auto mb-4 bg-brand-purple/10 rounded-lg flex items-center justify-center group-hover:bg-brand-purple/20 transition">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-brand-deep-purple font-montserrat mb-3">
                Explore My Work
              </h3>
              <p className="text-gray-600 mb-6">
                Discover my journey as a lawyer, writer, and feminist
                storyteller. Learn about what drives my work and what I care
                about.
              </p>
              <span className="inline-block text-brand-purple font-semibold group-hover:text-brand-pink transition">
                Learn More →
              </span>
            </Link>

            {/* CTA 2: Read Blog */}
            <Link
              to="/blog"
              className="group bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow border-2 border-transparent hover:border-brand-purple text-center"
            >
              <div className="h-16 w-16 mx-auto mb-4 bg-brand-pink/10 rounded-lg flex items-center justify-center group-hover:bg-brand-pink/20 transition">
                <span className="text-3xl">✍️</span>
              </div>
              <h3 className="text-xl font-bold text-brand-deep-purple font-montserrat mb-3">
                Read Embracing HERstory
              </h3>
              <p className="text-gray-600 mb-6">
                Explore blog posts and stories about feminist journeys, gender, tech
                policy, and the beautiful complexity of womanhood.
              </p>
              <span className="inline-block text-brand-purple font-semibold group-hover:text-brand-pink transition">
                Start Reading →
              </span>
            </Link>

            {/* CTA 3: Get in Touch */}
            <Link
              to="/contact"
              className="group bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow border-2 border-transparent hover:border-brand-purple text-center"
            >
              <div className="h-16 w-16 mx-auto mb-4 bg-brand-gold/10 rounded-lg flex items-center justify-center group-hover:bg-brand-gold/20 transition">
                <span className="text-3xl">💌</span>
              </div>
              <h3 className="text-xl font-bold text-brand-deep-purple font-montserrat mb-3">
                Let's Connect
              </h3>
              <p className="text-gray-600 mb-6">
                Whether you want to collaborate, discuss legal services, or just
                say hello, I'd love to hear from you.
              </p>
              <span className="inline-block text-brand-purple font-semibold group-hover:text-brand-pink transition">
                Get in Touch →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-brand-deep-purple font-montserrat mb-12">
            My Passion
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-brand-purple font-montserrat mb-4">
                What I Do
              </h3>
              <ul className="space-y-3">
                {[
                  "Legal advisory and litigation",
                  "Policy analysis and advocacy",
                  "Feminist storytelling and writing",
                  "Tech & gender policy consultation",
                  "Community engagement and workshops",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand-gold text-xl mt-1">✦</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-brand-purple font-montserrat mb-4">
                What Drives Me
              </h3>
              <ul className="space-y-3">
                {[
                  "Women deserve to tell their own stories",
                  "Technology should empower, not exclude",
                  "The law should reflect people's realities",
                  "Writing is activism",
                  "Justice is never passive—it is built",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand-pink text-xl mt-1">♀</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
