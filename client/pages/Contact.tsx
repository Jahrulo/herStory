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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-deep-purple to-brand-purple text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl">
            Whether you want to collaborate, request legal services, invite me
            to speak, or share your story, I'm open to connecting.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.title}
                  className="bg-white border border-gray-200 rounded-lg p-6 text-center"
                >
                  <div className="h-12 w-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-brand-purple" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-deep-purple font-montserrat mb-2">
                    {detail.title}
                  </h3>
                  {detail.link ? (
                    <a
                      href={detail.link}
                      className="text-brand-purple hover:text-brand-pink font-semibold transition-colors"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <p className="text-gray-700 font-semibold">{detail.value}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-brand-deep-purple font-montserrat mb-8">
                Send Me a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-border bg-white dark:bg-input text-gray-900 dark:text-foreground rounded-lg focus:outline-none focus:border-brand-purple placeholder:text-gray-500 dark:placeholder:text-muted-foreground"
                    placeholder="Tell me what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-purple text-white px-6 py-4 rounded-lg font-semibold hover:bg-brand-deep-purple transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Send Message
                </button>

                {isSubmitted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                    <Check className="text-green-600" size={20} />
                    <p className="text-green-700">
                      Thank you! I'll get back to you soon.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Side Information */}
            <div>
              <h2 className="text-3xl font-bold text-brand-deep-purple font-montserrat mb-8">
                Why Reach Out?
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-purple font-montserrat mb-3">
                    Legal Services Inquiry
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Need legal advice, representation, or consultation? I'm here
                    to help with clarity, integrity, and empowerment.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-purple font-montserrat mb-3">
                    Speaking Engagements
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Interested in having me speak at your event about feminism,
                    gender justice, or law and technology?
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-purple font-montserrat mb-3">
                    Collaboration & Partnerships
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Looking to collaborate on a project, podcast, publication, or
                    advocacy initiative? I'm open to meaningful partnerships.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-brand-purple font-montserrat mb-3">
                    Share Your Story
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Want to contribute to Embracing HERstory or share your
                    feminist journey? I'd love to hear from you.
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-brand-deep-purple font-montserrat mb-4">
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
                        className="h-12 w-12 bg-brand-purple/10 rounded-lg flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-colors"
                      >
                        <Icon size={20} />
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
