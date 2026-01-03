import { useState } from "react";
import { useBlog } from "@/contexts/BlogContext";
import BlogCard from "@/components/BlogCard";
import { Mail, Heart, Sparkles } from "lucide-react";

export default function Blog() {
  const { posts } = useBlog();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-deep-purple via-brand-purple to-brand-light-blue text-white py-12 md:py-16 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-pink rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Sparkles size={18} className="text-brand-gold" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Feminist Storytelling
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat mb-4 leading-tight">
            Embracing HERstory
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            A feminist storytelling project dedicated to documenting the
            emotional, political, and lived realities of women.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 md:py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-deep-purple font-montserrat mb-3">
              Featured Blog Posts
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-light-blue mx-auto rounded-full mb-4" />
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore thought-provoking narratives on feminism, justice, and
              womanhood
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 animate-fade-in">
              <div className="inline-block p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
                <p className="text-gray-600 text-lg font-medium">
                  No blog posts published yet. Check back soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Subscription Section */}
      {/* <section className="py-8 md:py-12 bg-gradient-to-br from-white via-brand-light-blue/5 to-white border-y border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 animate-scale-in">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-3 bg-brand-purple/10 rounded-xl">
                <Mail className="text-brand-purple" size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-deep-purple font-montserrat">
                Stay Connected
              </h2>
            </div>
            <p className="text-gray-600 mb-6 text-center text-lg leading-relaxed">
              Get new stories delivered to your inbox every week. Your inbox
              deserves more honesty.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-4 border-2 border-gray-200 bg-white text-gray-900 rounded-xl focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 placeholder:text-gray-400 transition-all text-base"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-brand-purple to-brand-pink text-white px-8 py-4 rounded-xl font-semibold hover:from-brand-deep-purple hover:to-brand-purple transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
              >
                Subscribe
              </button>
            </form>
            {isSubscribed && (
              <div className="mt-4 text-center animate-fade-in">
                <p className="inline-flex items-center gap-2 text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-full border border-green-200">
                  <Heart size={18} className="fill-green-600" /> Thanks for
                  subscribing!
                </p>
              </div>
            )}
          </div>
        </div>
      </section> */}
    </div>
  );
}
