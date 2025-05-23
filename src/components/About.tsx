
const About = () => {
  const skills = [
    { name: 'Python', level: 90 },
    { name: 'AI/ML', level: 85 },
    { name: 'Web Development', level: 80 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'C Programming', level: 85 },
    { name: 'Canva', level: 90 },
  ];

  const timeline = [
    {
      period: 'Present',
      title: 'AI Developer at SkillSync',
      description: 'Developing AI-powered solutions and contributing to innovative tech projects.',
    },
    {
      period: '2023 - Present',
      title: 'B.Tech CSE at IILM University',
      description: 'Pursuing Computer Science Engineering with focus on AI/ML and software development.',
    },
    {
      period: '2021 - 2023',
      title: 'Ryan International School',
      description: 'Completed higher secondary education with strong foundation in mathematics and science.',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            BEST AI/ML DEVELOPER
            <br />
            <span className="italic text-3xl md:text-4xl text-purple-400">& INNOVATOR</span> IN MAKING
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            As a dedicated Computer Science student with a passion for AI and innovation, I bring fresh perspectives 
            to technology challenges. My journey combines academic excellence with hands-on project experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Skills Section */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-cyan-400">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Preview */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-purple-400">What I Offer</h3>
            <div className="space-y-6">
              <div className="p-6 bg-slate-800/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-cyan-400 text-xl">🧠</span>
                </div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2">AI Solutions</h4>
                <p className="text-gray-400">Brainstorming and developing AI-powered concepts customized to your specific needs and business requirements.</p>
              </div>
              
              <div className="p-6 bg-slate-800/50 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-purple-400 text-xl">🎨</span>
                </div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">UI/UX Design</h4>
                <p className="text-gray-400">Creating interactive and attractive designs focused on user engagement and audience attraction.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-blue-400">Education & Experience</h3>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 group">
                <div className="md:w-32 flex-shrink-0">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-black text-sm font-semibold rounded-full">
                    {item.period}
                  </span>
                </div>
                <div className="flex-1 pb-8 border-l border-slate-700 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-500 rounded-full"></div>
                  <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
