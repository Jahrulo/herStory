import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Send,
  Check,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      console.log("Contact form submitted:", formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const contactDetails = [
    {
      icon: Mail,
      title: "Email",
      value: "henriettamarief@gmail.com",
      link: "mailto:henriettamarief@gmail.com",
    },
    {
      icon: Phone,
      title: "WhatsApp",
      value: "+232 32249144",
      link: "https://wa.me/23232249144",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Sierra Leone",
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/henrietta-marie-foray",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://instagram.com/henriettaforay",
    },
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://facebook.com/henriettaforay",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-deep-purple via-brand-purple to-brand-light-blue text-white py-12 md:py-16 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-pink rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Mail size={18} className="text-brand-gold" />
            <span className="text-sm font-semibold uppercase tracking-wide">Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat mb-4 leading-tight">
            Let's Connect
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl leading-relaxed">
            Whether you want to collaborate, request legal services, invite me
            to speak, or share your story, I'm open to connecting.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {contactDetails.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.title}
                  className="bg-white border border-gray-200/50 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-14 w-14 bg-brand-purple/10 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-purple/20 transition-colors">
                    <Icon className="text-brand-purple" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-deep-purple font-montserrat mb-3 group-hover:text-brand-purple transition-colors">
                    {detail.title}
                  </h3>
                  {detail.link ? (
                    <a
                      href={detail.link}
                      className="text-brand-purple hover:text-brand-pink font-semibold transition-colors text-base"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-gray-700 font-semibold text-base">{detail.value}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-8">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/50 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-deep-purple font-montserrat mb-6">
                Send Me a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 bg-white text-gray-900 rounded-xl focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 placeholder:text-gray-400 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 bg-white text-gray-900 rounded-xl focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 placeholder:text-gray-400 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Subject (Optional)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 bg-white text-gray-900 rounded-xl focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 placeholder:text-gray-400 transition-all"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 border-2 border-gray-200 bg-white text-gray-900 rounded-xl focus:outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 placeholder:text-gray-400 transition-all"
                    placeholder="Tell me what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-pink text-white px-6 py-4 rounded-xl font-semibold hover:from-brand-deep-purple hover:to-brand-purple transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Send Message
                </button>

                {isSubmitted && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
                    <Check className="text-green-600" size={20} />
                    <p className="text-green-700 font-medium">
                      Thank you! I'll get back to you soon.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Side Information */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-200/50 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-deep-purple font-montserrat mb-6">
                Why Reach Out?
              </h2>

              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-brand-purple font-montserrat mb-3">
                    Legal Services Inquiry
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    Need legal advice, representation, or consultation? I'm here
                    to help with clarity, integrity, and empowerment.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-purple font-montserrat mb-3">
                    Speaking Engagements
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    Interested in having me speak at your event about feminism,
                    gender justice, or law and technology?
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-purple font-montserrat mb-3">
                    Collaboration & Partnerships
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    Looking to collaborate on a project, podcast, publication, or
                    advocacy initiative? I'm open to meaningful partnerships.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-purple font-montserrat mb-3">
                    Share Your Story
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                    Want to contribute to Embracing HERstory or share your
                    feminist journey? I'd love to hear from you.
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-brand-deep-purple font-montserrat mb-4">
                  Connect on Social Media
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="h-14 w-14 bg-brand-purple/10 rounded-xl flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                      >
                        <Icon size={22} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
