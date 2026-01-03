import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-deep-purple via-brand-purple to-brand-light-blue py-12 md:py-16 text-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-pink rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles size={18} className="text-brand-gold" />
              <span className="text-sm font-semibold uppercase tracking-wide">Welcome to my digital home</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat mb-4 leading-tight">
              Embracing HERstory
            </h1>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto text-gray-100 leading-relaxed">
              Amplifying women's voices, shaping narratives, and exploring the
              evolving intersection of law, technology, and gender justice.
            </p>
          </div>

          {/* Brand Identity */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-3xl mx-auto border border-white/20 animate-scale-in">
            <p className="text-center text-base md:text-lg font-semibold mb-3">
              Legal practitioner | Feminist Storyteller | Tech & Gender Policy Enthusiast
            </p>
            <p className="text-center text-gray-100 leading-relaxed text-sm md:text-base">
              A Sierra Leonean Lawyer and founder of Embracing HERstory, dedicated to amplifying women's voices at the intersection of law, technology, and gender justice.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-deep-purple font-montserrat mb-3">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-light-blue mx-auto rounded-full mb-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* CTA 1: Explore Work */}
            <Link
              to="/about"
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:-translate-y-2 text-center animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="h-14 w-14 mx-auto mb-3 bg-brand-purple/10 rounded-xl flex items-center justify-center group-hover:bg-brand-purple/20 transition-colors">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-bold text-brand-deep-purple font-montserrat mb-2 group-hover:text-brand-purple transition-colors">
                Explore My Work
              </h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                Learn about my journey and what drives my work.
              </p>
              <span className="inline-flex items-center gap-2 text-brand-purple font-semibold text-sm group-hover:text-brand-pink transition-colors">
                Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            {/* CTA 2: Read Blog */}
            <Link
              to="/blog"
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:-translate-y-2 text-center animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="h-14 w-14 mx-auto mb-3 bg-brand-pink/10 rounded-xl flex items-center justify-center group-hover:bg-brand-pink/20 transition-colors">
                <span className="text-2xl">✍️</span>
              </div>
              <h3 className="text-lg font-bold text-brand-deep-purple font-montserrat mb-2 group-hover:text-brand-purple transition-colors">
                Read Embracing HERstory
              </h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                Stories about feminist journeys, gender, tech policy, and womanhood.
              </p>
              <span className="inline-flex items-center gap-2 text-brand-purple font-semibold text-sm group-hover:text-brand-pink transition-colors">
                Start Reading <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>

            {/* CTA 3: Get in Touch */}
            <Link
              to="/contact"
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:-translate-y-2 text-center animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="h-14 w-14 mx-auto mb-3 bg-brand-gold/10 rounded-xl flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                <span className="text-2xl">💌</span>
              </div>
              <h3 className="text-lg font-bold text-brand-deep-purple font-montserrat mb-2 group-hover:text-brand-purple transition-colors">
                Let's Connect
              </h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                Let's collaborate, discuss services, or just connect.
              </p>
              <span className="inline-flex items-center gap-2 text-brand-purple font-semibold text-sm group-hover:text-brand-pink transition-colors">
                Get in Touch <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
