import { Link } from "react-router-dom";
import { Linkedin, Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-deep-purple text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-3">
              Embracing HERstory
            </h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              A feminist storytelling platform by Henrietta Marie Foray,
              dedicated to amplifying women's voices and exploring the
              intersection of law, technology, and gender.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-200 hover:text-brand-gold transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-200 hover:text-brand-gold transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-200 hover:text-brand-gold transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-200 hover:text-brand-gold transition-colors"
                >
                  Legal Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-200 hover:text-brand-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-3">
              Connect With Me
            </h3>
            <p className="text-gray-200 text-sm mb-4">
              Email:{" "}
              <a
                href="mailto:henriettamarief@gmail.com"
                className="text-brand-gold hover:underline"
              >
                henriettamarief@gmail.com
              </a>
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/henrietta-marie-foray"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-200 hover:text-brand-gold transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://instagram.com/henriettaforay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-200 hover:text-brand-gold transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/henriettaforay"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-200 hover:text-brand-gold transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:henriettamarief@gmail.com"
                aria-label="Email"
                className="text-gray-200 hover:text-brand-gold transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <p className="text-center text-gray-300 text-sm">
            © {currentYear} Henrietta Marie Foray. All rights reserved. Built
            with purpose, passion, and commitment to feminist storytelling.
          </p>
        </div>
      </div>
    </footer>
  );
}
