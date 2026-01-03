import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Menu,
  X,
  LogOut,
  FileText,
  BarChart3,
  Home as HomeIcon,
} from "lucide-react";

interface AdminSidebarProps {
  currentSection: "dashboard" | "posts";
  onSectionChange: (section: "dashboard" | "posts") => void;
}

export default function AdminSidebar({
  currentSection,
  onSectionChange,
}: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
    },
    {
      id: "posts",
      label: "Blog Posts",
      icon: FileText,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-brand-deep-purple text-white hover:bg-brand-purple transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:static inset-y-0 left-0 w-64 bg-brand-deep-purple text-white
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col
      `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-brand-gold flex items-center justify-center">
              <span className="text-brand-deep-purple font-bold">HH</span>
            </div>
            <div>
              <h2 className="font-bold font-montserrat">Embracing HERstory</h2>
              <p className="text-xs text-gray-300">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id as "dashboard" | "posts");
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  font-medium transition-colors text-left
                  ${
                    currentSection === item.id
                      ? "bg-brand-gold text-brand-deep-purple"
                      : "text-white hover:bg-brand-purple/50"
                  }
                `}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Back to Site Link */}
        <div className="border-t border-white/10 p-4">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-brand-purple/50 transition-colors font-medium"
          >
            <HomeIcon size={20} />
            Back to Site
          </a>
        </div>

        {/* Logout Button */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
