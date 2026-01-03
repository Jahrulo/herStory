import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl font-bold text-brand-purple font-montserrat mb-4">
            404
          </h1>
          <p className="text-2xl font-bold text-brand-deep-purple font-montserrat mb-4">
            Page Not Found
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist. Let's get you back
            on track.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-purple text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-deep-purple transition-colors"
        >
          <Home size={20} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
