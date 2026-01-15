import { Link } from "react-router-dom";
import {
  Briefcase,
  FileText,
  Users,
  ScrollText,
  Building2,
  Shield,
  Zap,
  Home,
  CheckCircle,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Briefcase,
      title: "Litigation & Alternative Dispute Resolution",
      description: "Professional legal representation in court proceedings and alternative dispute resolution.",
    },
    {
      icon: FileText,
      title: "Legal Research & Opinion Writing",
      description:
        "Comprehensive legal research and professional opinion writing.",
    },
    {
      icon: ScrollText,
      title: "Policy Analysis & Legislative Review",
      description: "In-depth analysis of policies and legislative documents.",
    },
    {
      icon: FileText,
      title: "Contract Drafting & Review",
      description: "Expert drafting and thorough review of legal contracts.",
    },
    {
      icon: Users,
      title: "Legal Advisory for Startups & Creatives",
      description:
        "Tailored legal guidance for emerging businesses and creative professionals.",
    },
    {
      icon: Users,
      title: "Gender & Human Rights Advocacy",
      description: "Strategic advocacy for gender justice and human rights.",
    },
    {
      icon: Shield,
      title: "Tech & Data Protection Advisory",
      description:
        "Expert consultation on technology law and data protection compliance.",
    },
    {
      icon: Home,
      title: "Land & Real Estate Disputes",
      description:
        "Professional resolution of property and land-related disputes.",
    },
    {
      icon: CheckCircle,
      title: "Regulatory Compliance & Consultancy",
      description:
        "Guidance on regulatory requirements and compliance frameworks.",
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
            <Briefcase size={18} className="text-brand-gold" />
            <span className="text-sm font-semibold uppercase tracking-wide">Professional Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat mb-4 leading-tight">
            Legal Services & Practice Areas
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl leading-relaxed">
            As a legal practitioner, I offer tailored legal support grounded in
            clarity, integrity, and empowerment.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-deep-purple font-montserrat mb-3">
              Core Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-light-blue mx-auto rounded-full mb-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white border border-gray-200/50 rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="h-14 w-14 bg-brand-purple/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-purple/20 transition-colors">
                    <Icon className="text-brand-purple" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-deep-purple font-montserrat mb-3 group-hover:text-brand-purple transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About My Approach */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-white via-brand-light-blue/5 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-deep-purple font-montserrat mb-3">
              My Approach to Legal Practice
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-light-blue mx-auto rounded-full mb-4" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Clarity & Communication", color: "border-brand-purple", desc: "Clear, accessible language for informed decisions." },
              { title: "Integrity & Ethics", color: "border-brand-pink", desc: "Grounded in ethical principles and genuine commitment." },
              { title: "Empowerment & Advocacy", color: "border-brand-gold", desc: "Equipping you with knowledge while advocating for your rights." },
              { title: "Gender-Conscious Practice", color: "border-brand-light-blue", desc: "Recognizing how gender shapes legal outcomes and access to justice." },
            ].map((approach, idx) => (
              <div
                key={approach.title}
                className={`bg-white p-5 rounded-2xl border-l-4 ${approach.color} shadow-sm hover:shadow-md transition-all group animate-fade-in`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-lg font-semibold text-brand-deep-purple mb-2 font-montserrat group-hover:text-brand-purple transition-colors">
                  {approach.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {approach.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-scale-in">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-deep-purple font-montserrat mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
              Whether you need legal representation, consultation, or policy
              advice, I'm here to help. Let's discuss your needs and find the best
              path forward.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-gradient-to-r from-brand-purple to-brand-pink text-white px-8 py-4 rounded-xl font-semibold hover:from-brand-deep-purple hover:to-brand-purple transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Contact Me for a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
