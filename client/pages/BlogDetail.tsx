import { useParams, Link, useNavigate } from "react-router-dom";
import { useBlog } from "@/contexts/BlogContext";
import { ArrowLeft } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const { getPostById } = useBlog();
  const navigate = useNavigate();

  const post = id ? getPostById(id) : null;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-deep-purple font-montserrat mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-pink font-semibold transition-colors"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-deep-purple to-brand-purple text-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 mb-6 hover:text-brand-gold transition-colors"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <span className="inline-block bg-brand-pink/30 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            {post.theme}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
            {post.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-200">
            <span>By {post.author}</span>
            <span className="hidden sm:inline">•</span>
            <time>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 md:py-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author Bio */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👩‍⚖️</span>
              </div>
              <div>
                <h3 className="font-bold text-brand-deep-purple font-montserrat">
                  {post.author}
                </h3>
                <p className="text-gray-600 text-sm">
                  Lawyer, Writer & Feminist Storyteller. Creator of Embracing
                  HERstory.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <Link
              to="/blog"
              className="flex-1 px-6 py-3 bg-brand-purple text-white rounded-lg font-semibold hover:bg-brand-deep-purple transition-colors text-center"
            >
              ← Back to All Blog Posts
            </Link>
            <a
              href="mailto:henriettamarief@gmail.com"
              className="flex-1 px-6 py-3 bg-brand-gold text-brand-deep-purple rounded-lg font-semibold hover:bg-brand-pink hover:text-white transition-colors text-center"
            >
              Share Your Thoughts →
            </a>
          </div>
        </article>
      </section>
    </div>
  );
}
