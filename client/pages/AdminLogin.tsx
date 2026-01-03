import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        navigate("/admin");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-deep-purple via-brand-purple to-brand-light-blue flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="h-16 w-16 bg-brand-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <LogIn className="text-brand-purple" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-brand-deep-purple font-montserrat">
              Admin Login
            </h1>
            <p className="text-gray-600 mt-2">
              Access the blog management panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-deep-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-brand-purple/5 rounded-lg">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">Demo credentials:</span>
              <br />
              Username: <code className="bg-white px-2 py-1 rounded text-xs">admin</code>
              <br />
              Password: <code className="bg-white px-2 py-1 rounded text-xs">password</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
