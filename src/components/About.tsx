

const About = () => {
  const skills = [
    { name: 'Python', level: 90 },
    { name: 'AI/ML', level: 85 },
    { name: 'Web Development', level: 80 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'C Programming', level: 85 },
    { name: 'Canva', level: 90 },
    { name: 'Content Writing', level: 88 },
    { name: 'Poetry', level: 85 },
  ];

  const timeline = [
    {
      period: 'Present',
      title: 'AI Developer at SkillSync',
      description: 'Developing AI-powered solutions and contributing to innovative tech projects.',
    },
    {
      period: '2024 - Present',
      title: 'B.Tech CSE at IILM University',
      description: 'Pursuing Computer Science Engineering with focus on AI/ML and software development.',
    },
    {
      period: '2010 - 2024',
      title: 'Ryan International School',
      description: 'Completed higher secondary education with strong foundation in mathematics and science.',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase animate-slide-up">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-slide-up delay-200">
            AI DEVELOPER, INNOVATOR
            <br />
            <span className="italic text-3xl md:text-4xl text-purple-400 hover:text-cyan-400 transition-colors duration-500">& CREATIVE WRITER</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-slide-up delay-300">
            As a dedicated Computer Science student with a passion for AI and innovation, I bring fresh perspectives 
            to technology challenges. My journey combines academic excellence with hands-on project experience.
            Beyond technology, I express my creativity through poetry and content writing, bringing a unique blend
            of technical and artistic abilities to everything I create.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Enhanced Skills Section */}
          <div className="animate-slide-up delay-500">
            <h3 className="text-2xl font-bold mb-8 text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              Technical Skills
            </h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="group hover:scale-105 transition-transform duration-300">
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium group-hover:text-cyan-400 transition-colors duration-300">{skill.name}</span>
                    <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out hover:from-purple-500 hover:to-cyan-500 shadow-lg shadow-cyan-500/25"
                      style={{ 
                        width: `${skill.level}%`,
                        animationDelay: `${index * 200}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Services Preview */}
          <div className="animate-slide-up delay-700">
            <h3 className="text-2xl font-bold mb-8 text-purple-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></span>
              What I Offer
            </h3>
            <div className="space-y-6">
              <div className="p-6 bg-slate-800/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group hover:scale-105 hover:bg-slate-800/70 hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-all duration-300 group-hover:scale-110">
                  <span className="text-cyan-400 text-xl">🧠</span>
                </div>
                <h4 className="text-lg font-semibold text-cyan-400 mb-2 group-hover:text-cyan-300 transition-colors duration-300">AI Solutions</h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Brainstorming and developing AI-powered concepts customized to your specific needs and business requirements.</p>
              </div>
              
              <div className="p-6 bg-slate-800/50 rounded-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group hover:scale-105 hover:bg-slate-800/70 hover:shadow-lg hover:shadow-purple-500/10">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-all duration-300 group-hover:scale-110">
                  <span className="text-purple-400 text-xl">🎨</span>
                </div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2 group-hover:text-purple-300 transition-colors duration-300">UI/UX Design</h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Creating interactive and attractive designs focused on user engagement and audience attraction.</p>
              </div>
              
              <div className="p-6 bg-slate-800/50 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group hover:scale-105 hover:bg-slate-800/70 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-all duration-300 group-hover:scale-110">
                  <span className="text-blue-400 text-xl">✒️</span>
                </div>
                <h4 className="text-lg font-semibold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300">Creative Writing</h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Crafting compelling poetry, engaging content, and creative copy that captivates and resonates with your audience.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Timeline */}
        <div className="mb-16 animate-slide-up delay-1000">
          <h3 className="text-2xl font-bold mb-8 text-center text-blue-400 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700"></span>
            Education & Experience
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-700"></span>
          </h3>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 group hover:scale-105 transition-transform duration-300">
                <div className="md:w-32 flex-shrink-0">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-black text-sm font-semibold rounded-full group-hover:from-purple-500 group-hover:to-cyan-500 transition-all duration-300 shadow-lg group-hover:shadow-cyan-500/25">
                    {item.period}
                  </span>
                </div>
                <div className="flex-1 pb-8 border-l border-slate-700 pl-6 relative group-hover:border-cyan-500/50 transition-colors duration-300">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-500 rounded-full group-hover:bg-purple-500 transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-purple-500/50"></div>
                  <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{item.title}</h4>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Poetry Sample */}
        <div className="mb-16 bg-slate-800/30 p-8 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 group hover:bg-slate-800/50 hover:shadow-2xl hover:shadow-blue-500/10 animate-slide-up delay-1200">
          <h3 className="text-2xl font-bold mb-6 text-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">My Creative Writing</h3>
          <div className="italic text-gray-300 text-center max-w-2xl mx-auto mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
            <p className="mb-4 hover:scale-105 transition-transform duration-300">
              "Through silicon valleys and digital realms,<br/>
              Where algorithms dance and logic overwhelms,<br/>
              I craft with code and write with heart,<br/>
              Blending science and poetry, never apart."
            </p>
            <p className="text-sm text-blue-400 font-semibold group-hover:text-blue-300 transition-colors duration-300">- Sample from my tech-inspired poetry collection</p>
          </div>
          <div className="text-center">
            <a
              href="https://www.instagram.com/devansh_writez/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 hover:text-blue-300"
            >
              View My Writing Portfolio
            </a>
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="text-center animate-slide-up delay-1400">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-cyan-500 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 animate-pulse"
          >
            Get In Touch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

