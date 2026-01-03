import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBlog } from "@/contexts/BlogContext";
import { BlogPost } from "@shared/api";
import { Plus, Edit2, Trash2, X, Save } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

const THEMES = [
  "Feminist journeys",
  "Women's rights & autonomy",
  "Gender reflections",
  "Tech, law & policy",
  "Healing & boundaries",
  "Love, desire & womanhood",
  "Power, politics & identity",
  "Social justice narratives",
];

export default function AdminDashboard() {
  const { isAuthenticated } = useAuth();
  const { posts, addPost, updatePost, deletePost } = useBlog();
  const [currentSection, setCurrentSection] = useState<"dashboard" | "posts">(
    "dashboard"
  );
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<BlogPost, "id">>({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    theme: THEMES[0],
    author: "Henrietta Marie Foray",
  });

  if (!isAuthenticated) {
    return null;
  }

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const success = await updatePost(editingId, formData);
      if (success) {
        setEditingId(null);
        resetForm();
      }
    } else {
      const success = await addPost(formData);
      if (success) {
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      theme: THEMES[0],
      author: "Henrietta Marie Foray",
    });
    setShowForm(false);
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      theme: post.theme,
      author: post.author,
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="ml-12 md:ml-0">
                <h1 className="text-2xl md:text-3xl font-bold text-brand-deep-purple font-montserrat">
                  {currentSection === "dashboard" ? "Dashboard" : "Blog Posts"}
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  {currentSection === "dashboard"
                    ? "Overview and statistics"
                    : "Manage your blog posts"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {currentSection === "dashboard" && (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-gray-600 font-semibold text-sm mb-2">
                    Total Posts
                  </h3>
                  <p className="text-4xl font-bold text-brand-purple">
                    {posts.length}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-gray-600 font-semibold text-sm mb-2">
                    Recent Post
                  </h3>
                  <p className="text-sm text-gray-700">
                    {posts.length > 0
                      ? posts[0].title.substring(0, 30) + "..."
                      : "No posts yet"}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-gray-600 font-semibold text-sm mb-2">
                    Status
                  </h3>
                  <p className="text-sm text-green-600 font-semibold">
                    ✓ Connected
                  </p>
                </div>
              </div>

              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-brand-purple to-brand-pink rounded-lg p-6 sm:p-8 text-white">
                <h2 className="text-2xl font-bold font-montserrat mb-2">
                  Welcome Back!
                </h2>
                <p className="text-gray-100 mb-4">
                  Manage your blog posts and keep your feminist storytelling
                  platform updated.
                </p>
                <button
                  onClick={() => setCurrentSection("posts")}
                  className="bg-white text-brand-purple px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Go to Blog Posts →
                </button>
              </div>
            </div>
          )}

          {currentSection === "posts" && (
            <div>
              {/* Add New Post Button */}
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="mb-8 flex items-center gap-2 bg-brand-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-deep-purple transition-colors"
                >
                  <Plus size={20} /> New Blog Post
                </button>
              )}

              {/* Form */}
              {showForm && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-8 mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-brand-deep-purple font-montserrat">
                      {editingId ? "Edit Post" : "Create New Post"}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
                        placeholder="Post title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Excerpt
                      </label>
                      <textarea
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleFormChange}
                        required
                        rows={2}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
                        placeholder="Brief summary of the post"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Content
                      </label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleFormChange}
                        required
                        rows={8}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple font-mono text-sm placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
                        placeholder="Full post content (use double line breaks for paragraphs)"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Theme
                        </label>
                        <select
                          name="theme"
                          value={formData.theme}
                          onChange={handleFormChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple"
                        >
                          {THEMES.map((theme) => (
                            <option key={theme} value={theme}>
                              {theme}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Author
                        </label>
                        <input
                          type="text"
                          name="author"
                          value={formData.author}
                          onChange={handleFormChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-brand-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-deep-purple transition-colors"
                      >
                        <Save size={18} />{" "}
                        {editingId ? "Update Post" : "Create Post"}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Posts List */}
              <div>
                <h2 className="text-2xl font-bold text-brand-deep-purple font-montserrat mb-6">
                  Blog Posts ({posts.length})
                </h2>

                {posts.length > 0 ? (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className="inline-block bg-brand-pink/10 text-brand-pink px-3 py-1 rounded-full text-sm font-medium">
                                {post.theme}
                              </span>
                              <time className="text-sm text-gray-500">
                                {new Date(post.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </time>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-brand-deep-purple font-montserrat mb-2 break-words">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <p className="text-xs text-gray-500">
                              By {post.author}
                            </p>
                          </div>

                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleEdit(post)}
                              className="flex items-center gap-2 bg-brand-purple text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-brand-deep-purple transition-colors whitespace-nowrap text-sm sm:text-base"
                            >
                              <Edit2 size={16} />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="flex items-center gap-2 bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors whitespace-nowrap text-sm sm:text-base"
                            >
                              <Trash2 size={16} />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-600 text-lg">
                      No blog posts yet.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Click "New Blog Post" to create your first blog post.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
