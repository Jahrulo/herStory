import { useState } from "react";
import { useBlog } from "@/contexts/BlogContext";
import BlogCard from "@/components/BlogCard";
import { Mail, Heart } from "lucide-react";

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-deep-purple via-brand-purple to-brand-light-blue text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
            Embracing HERstory
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            A feminist storytelling project dedicated to documenting the
            emotional, political, and lived realities of women.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Embracing HERstory is my personal commitment to documenting the
            emotional, political, and lived realities of women. It is a space
            where stories breathe, where silence becomes voice, and where the
            messy, beautiful, complicated, powerful truths of womanhood are
            honored.
          </p>

          <h3 className="text-2xl font-bold text-brand-deep-purple font-montserrat mb-4">
            Here, I write about:
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              "Feminist journeys and personal empowerment",
              "Law, technology, and gender",
              "Social justice reflections",
              "Women's rights and body autonomy",
              "Relationship dynamics, boundary-setting, and healing",
              "Everyday feminism: the subtle revolutions in our lives",
            ].map((topic) => (
              <div key={topic} className="flex items-start gap-3">
                <span className="text-brand-pink text-lg">♀</span>
                <p className="text-gray-700">{topic}</p>
              </div>
            ))}
          </div>

          <div className="bg-brand-pink/10 border-l-4 border-brand-pink p-6 rounded">
            <p className="text-lg text-brand-deep-purple font-semibold mb-3">
              I believe storytelling is activism. Writing is my resistance. And
              sharing our stories is how we reclaim power.
            </p>
            <p className="text-gray-700">
              This is HERstory, not history written about women, but stories
              told by women, for women, and with women. Here, we tell the truth
              loudly, clearly, unapologetically.
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Mail className="text-brand-purple" size={24} />
            <h2 className="text-2xl font-bold text-brand-deep-purple font-montserrat">
              Subscribe to New Essays
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Get new stories every week. Your inbox deserves more honesty.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="bg-brand-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-deep-purple transition-colors"
            >
              Subscribe
            </button>
          </form>
          {isSubscribed && (
            <p className="mt-4 text-green-600 flex items-center gap-2">
              <Heart size={16} /> Thanks for subscribing!
            </p>
          )}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-deep-purple font-montserrat mb-12">
            Featured Essays
          </h2>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No essays published yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Content Themes */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-deep-purple font-montserrat mb-8">
            Content Themes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Feminist journeys",
              "Women's rights & autonomy",
              "Gender reflections",
              "Tech, law & policy",
              "Healing & boundaries",
              "Love, desire & womanhood",
              "Power, politics & identity",
              "Social justice narratives",
            ].map((theme) => (
              <div
                key={theme}
                className="bg-white p-4 rounded-lg border border-gray-200 text-center"
              >
                <p className="text-gray-700 font-medium">{theme}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
