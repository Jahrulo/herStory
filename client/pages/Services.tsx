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
      title: "Litigation & Court Representation",
      description: "Professional legal representation in court proceedings.",
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-deep-purple to-brand-purple text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
            Legal Services & Practice Areas
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl">
            As a legal practitioner, I offer tailored legal support grounded in
            clarity, integrity, and empowerment.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-deep-purple font-montserrat mb-12">
            Core Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="h-12 w-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-brand-purple" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-deep-purple font-montserrat mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About My Approach */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-deep-purple font-montserrat mb-8">
            My Approach to Legal Practice
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-l-4 border-brand-purple">
              <h3 className="text-xl font-semibold text-brand-deep-purple mb-2 font-montserrat">
                Clarity & Communication
              </h3>
              <p className="text-gray-700">
                Legal concepts should never obscure understanding. I communicate
                complex legal matters in clear, accessible language so you can
                make informed decisions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-brand-pink">
              <h3 className="text-xl font-semibold text-brand-deep-purple mb-2 font-montserrat">
                Integrity & Ethics
              </h3>
              <p className="text-gray-700">
                My practice is grounded in ethical principles and genuine
                commitment to my clients' best interests, not legal procedures
                alone.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-brand-gold">
              <h3 className="text-xl font-semibold text-brand-deep-purple mb-2 font-montserrat">
                Empowerment & Advocacy
              </h3>
              <p className="text-gray-700">
                I believe clients should be empowered in their legal matters. My
                role is to advocate for your rights while equipping you with the
                knowledge to navigate legal challenges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-brand-light-blue">
              <h3 className="text-xl font-semibold text-brand-deep-purple mb-2 font-montserrat">
                Gender-Conscious Practice
              </h3>
              <p className="text-gray-700">
                I bring a gender-conscious lens to legal practice, recognizing
                how gender shapes legal outcomes, access to justice, and lived
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-deep-purple font-montserrat mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Whether you need legal representation, consultation, or policy
            advice, I'm here to help. Let's discuss your needs and find the best
            path forward.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-brand-purple text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-deep-purple transition-colors"
          >
            Contact Me for a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
