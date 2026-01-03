import { Link } from "react-router-dom";
import { BlogPost } from "@shared/api";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Create gradient based on theme for visual variety
  const gradientColors = [
    "from-brand-purple/20 via-brand-pink/10 to-brand-light-blue/20",
    "from-brand-deep-purple/20 via-brand-purple/10 to-brand-pink/20",
    "from-brand-pink/20 via-brand-light-blue/10 to-brand-purple/20",
    "from-brand-light-blue/20 via-brand-purple/10 to-brand-deep-purple/20",
  ];
  const gradientColor = gradientColors[index % gradientColors.length];

  return (
    <article
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Decorative gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      
      {/* Content */}
      <div className="relative p-5 md:p-6">
        {/* Theme Badge */}
        <div className="mb-3">
          <span className="inline-block bg-brand-pink/15 text-brand-pink px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide border border-brand-pink/20 group-hover:bg-brand-pink/25 group-hover:border-brand-pink/30 transition-colors">
            {post.theme}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-brand-deep-purple mb-3 font-montserrat line-clamp-2 group-hover:text-brand-purple transition-colors duration-300">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-[15px] group-hover:text-gray-700 transition-colors">
          {post.excerpt}
        </p>

        {/* Date and Read More Container */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={16} className="text-brand-purple/60" />
            <span className="font-medium">{formattedDate}</span>
          </div>

          {/* Read More Link */}
          <Link
            to={`/blog/${post.id}`}
            className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-pink font-semibold transition-all duration-300 group/link"
          >
            <span className="group-hover/link:translate-x-1 transition-transform inline-block">
              Read More
            </span>
            <ArrowRight 
              size={18} 
              className="group-hover/link:translate-x-1 transition-transform duration-300" 
            />
          </Link>
        </div>
      </div>

      {/* Hover effect accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-light-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </article>
  );
}
