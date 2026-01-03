import { useParams, Link, useNavigate } from "react-router-dom";
import { useBlog } from "@/contexts/BlogContext";
import { ArrowLeft, Calendar, User, Sparkles } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const { getPostById } = useBlog();
  const navigate = useNavigate();

  const post = id ? getPostById(id) : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 border border-gray-200 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-deep-purple font-montserrat mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-brand-purple text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-deep-purple transition-colors shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-brand-deep-purple via-brand-purple to-brand-light-blue text-white py-10 md:py-14 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-pink rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 hover:text-brand-gold transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <div className="inline-block bg-brand-pink/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              {post.theme}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat mb-6 leading-tight text-left">
            {post.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-200">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span className="font-medium">{post.author}</span>
            </div>
            <span className="hidden sm:inline text-gray-400">•</span>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <time className="font-medium">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-8 md:py-12">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8 md:p-12 mb-10 animate-fade-in">
            <div className="max-w-none">
              {post.content.split("\n\n").map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-gray-700 leading-relaxed mb-6 text-lg md:text-xl text-left"
                  style={{ textAlign: "left" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <div className="mb-10 animate-slide-up">
            <div className="flex items-center gap-6 p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-gray-200/50 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center flex-shrink-0 shadow-lg border-4 border-white">
                <span className="text-3xl md:text-4xl">👩‍⚖️</span>
              </div>
              <div>
                <h3 className="font-bold text-brand-deep-purple font-montserrat text-xl md:text-2xl mb-2">
                  {post.author}
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  Lawyer, Writer & Feminist Storyteller. Creator of Embracing
                  HERstory.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
            <Link
              to="/blog"
              className="flex-1 px-6 py-4 bg-brand-purple text-white rounded-xl font-semibold hover:bg-brand-deep-purple transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Back to All Blog Posts
            </Link>
            <a
              href="mailto:henriettamarief@gmail.com"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-brand-gold to-brand-pink text-white rounded-xl font-semibold hover:from-brand-pink hover:to-brand-purple transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
            >
              Share Your Thoughts →
            </a>
          </div>
        </article>
      </section>
    </div>
  );
}
