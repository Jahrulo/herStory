import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Components
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Contexts
import { BlogProvider } from "./contexts/BlogContext";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BlogProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Home />
                    </Layout>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <Layout>
                      <About />
                    </Layout>
                  }
                />
                <Route
                  path="/blog"
                  element={
                    <Layout>
                      <Blog />
                    </Layout>
                  }
                />
                <Route
                  path="/blog/:id"
                  element={
                    <Layout>
                      <BlogDetail />
                    </Layout>
                  }
                />
                <Route
                  path="/services"
                  element={
                    <Layout>
                      <Services />
                    </Layout>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <Layout>
                      <Contact />
                    </Layout>
                  }
                />

                {/* Admin Routes */}
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all */}
                <Route
                  path="*"
                  element={
                    <Layout>
                      <NotFound />
                    </Layout>
                  }
                />
              </Routes>
            </BrowserRouter>
          </BlogProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
