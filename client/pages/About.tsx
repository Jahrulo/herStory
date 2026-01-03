export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-purple to-brand-light-blue text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat">
            About Henrietta Marie Foray
          </h1>
          <p className="mt-4 text-lg text-gray-100">
            Lawyer, Writer, Feminist Storyteller
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Image Section */}
          <div className="mb-12 flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center">
              <span className="text-7xl">👩‍⚖️</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-16">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              I am a Sierra Leonean lawyer, writer, and feminist storyteller
              committed to reshaping how we understand justice, gender, and
              social systems. With professional experience across litigation,
              community engagement, organizational governance, and public
              interest advocacy, my work sits at the intersection of law,
              technology, gender, and social change.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              My legal career spans corporate and administrative law,
              anti-corruption programming, public-facing advocacy, and working
              closely with communities, women, and young people. Beyond the
              courtroom, I am deeply invested in how law and technology
              influence human rights, access to justice, data governance,
              women's bodies, and everyday life in African societies.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              I am also a writer, a part of me that refuses to be separated from
              the lawyer. I write essays, reflections, and stories that explore
              women's journeys, emotional resilience, feminist agency, and the
              private worlds we are often told to silence. This passion led me to
              create Embracing HERstory, a storytelling space dedicated to
              amplifying women's voices and documenting our emotional, political,
              and personal histories.
            </p>
          </div>

          {/* What I Care About */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-brand-deep-purple font-montserrat mb-8">
              What I Care About
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Gender justice & feminist storytelling",
                "Technology law & digital rights",
                "Policy development & public interest law",
                "Writing as a tool for healing, resistance & transformation",
                "Amplifying women's lived experiences",
                "Community-centered advocacy",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-brand-pink/5 border-l-4 border-brand-pink p-4 rounded"
                >
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Drives Me */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-brand-deep-purple font-montserrat mb-8">
              What Drives Me
            </h2>
            <div className="space-y-4">
              {[
                "Women deserve to tell their own stories.",
                "Technology should empower, not exclude.",
                "The law should reflect people's realities, especially women's.",
                "Writing is my activism.",
                "Justice is never passive, it is built.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 p-4 bg-brand-gold/5 rounded-lg"
                >
                  <span className="text-2xl text-brand-gold mt-1">✦</span>
                  <p className="text-gray-700 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Facts */}
          <div>
            <h2 className="text-3xl font-bold text-brand-deep-purple font-montserrat mb-8">
              Fun Facts
            </h2>
            <div className="bg-brand-light-blue/30 p-8 rounded-lg">
              <ul className="space-y-4">
                {[
                  "I read like oxygen is hidden between pages.",
                  "Writing is my love language and my rebellion.",
                  "I can have ten conversations in my head before saying one sentence out loud.",
                  "I believe women's stories are archives, and I'm committed to documenting them.",
                  "I love women, boundaries, clarity, and soft life.",
                  "I love money and I respect people who respect my work.",
                ].map((fact) => (
                  <li
                    key={fact}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="text-brand-purple text-2xl mt-1">
                      ♀
                    </span>
                    <span className="text-lg">{fact}</span>
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
