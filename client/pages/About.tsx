import { Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-deep-purple via-brand-purple to-brand-light-blue text-white py-12 md:py-16 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-pink rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Sparkles size={18} className="text-brand-gold" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              My Story
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-montserrat mb-4 leading-tight">
            About Henrietta Marie Foray
          </h1>
          <p className="text-xl md:text-2xl text-gray-100">
            Lawyer, Writer, Feminist Storyteller
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Image Section */}
          <div className="mb-8 flex justify-center animate-scale-in">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center shadow-xl border-4 border-white">
              <img
                src="/img.png"
                alt="Henrietta Marie Foray"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/50 animate-fade-in">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
              I am a lawyer, writer, and feminist storyteller
              committed to reshaping how we understand justice, gender, and
              social systems. My work sits at the intersection of law,
              technology, gender, and social change—spanning litigation, policy
              advocacy, community engagement, and public interest work.
            </p>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Beyond the courtroom, I write blog posts, reflections, and stories
              exploring women's journeys, feminist agency, and the complexities
              of gender and power. This passion led me to create Embracing
              HERstory, a storytelling platform dedicated to amplifying women's
              voices and documenting our emotional, political, and personal
              histories.
            </p>
          </div>

          {/* What I Care About */}
          <div className="mb-8 animate-slide-up">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-deep-purple font-montserrat mb-3">
                What I Care About
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-light-blue mx-auto rounded-full mb-4" />
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                "Gender justice & feminist storytelling",
                "Technology law & digital rights",
                "Policy development & public interest law",
                "Writing as activism",
                "Amplifying women's lived experiences",
                "Community-centered advocacy",
              ].map((item, idx) => (
                <div
                  key={item}
                  className="bg-white border-l-4 border-brand-pink p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <p className="text-gray-700 font-medium text-base group-hover:text-brand-deep-purple transition-colors">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What Drives Me */}
          <div
            className="mb-8 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-deep-purple font-montserrat mb-3">
                What Drives Me
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-light-blue mx-auto rounded-full mb-4" />
            </div>
            <div className="space-y-3">
              {[
                "Women deserve to tell their own stories.",
                "Technology should empower, not exclude.",
                "The law should reflect people's realities, especially women's.",
                "Writing is my activism.",
                "Justice is never passive, it is built.",
              ].map((item, idx) => (
                <div
                  key={item}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200/50 group"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="text-2xl text-brand-gold mt-1 group-hover:scale-110 transition-transform">
                    ✦
                  </span>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Facts */}
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-deep-purple font-montserrat mb-3">
                Fun Facts
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-purple via-brand-pink to-brand-light-blue mx-auto rounded-full mb-4" />
            </div>
            <div className="bg-gradient-to-br from-brand-light-blue/20 via-white to-brand-purple/5 p-6 md:p-8 rounded-2xl border border-gray-200/50 shadow-sm">
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "I read like oxygen is hidden between pages.",
                  "Writing is my love language and my rebellion.",
                  "Women's stories are archives I'm committed to documenting.",
                  "I love boundaries, clarity, and respecting people who respect my work.",
                ].map((fact, idx) => (
                  <li
                    key={fact}
                    className="flex items-start gap-3 text-gray-700 group"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <span className="text-brand-purple text-xl mt-1 group-hover:scale-110 transition-transform">
                      ♀
                    </span>
                    <span className="text-base md:text-lg leading-relaxed">
                      {fact}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
