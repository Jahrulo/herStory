import { Link } from "react-router-dom";
import { BlogPost } from "@shared/api";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* Theme Badge */}
        <div className="mb-3">
          <span className="inline-block bg-brand-pink/10 text-brand-pink px-3 py-1 rounded-full text-sm font-medium">
            {post.theme}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-brand-deep-purple mb-3 font-montserrat line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        {/* Date */}
        <p className="text-sm text-gray-500 mb-4">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Read More Link */}
        <Link
          to={`/blog/${post.id}`}
          className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-pink font-semibold transition-colors"
        >
          Read Full Essay
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
