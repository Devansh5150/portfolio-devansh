const Leadership = () => {
  const leadershipRoles = [
    {
      title: 'President - Globe Club (B.Tech Branch)',
      period: '2025 - Present',
      organization: 'IILM University',
      description: 'Leading the Globe Club\'s B.Tech division, promoting interdisciplinary learning and cultural engagement across departments. Overseeing event planning, member coordination, and collaborations with university societies for academic and social growth.',
      achievements: [
        'Promoted interdisciplinary learning across departments',
        'Coordinated cultural engagement activities',
        'Managed event planning and member coordination',
        'Facilitated collaborations with university societies'
      ],
      icon: '👑',
      color: 'blue'
    },
    {
      title: 'Social Media Head',
      period: '2025',
      organization: 'Aisynctech',
      description: 'Managed digital outreach and campaign strategy for the tech club, enhancing engagement and participation in workshops and hackathons. Designed and executed creative content initiatives highlighting club achievements and AI-driven projects.',
      achievements: [
        'Enhanced digital outreach and engagement',
        'Developed campaign strategies for workshops',
        'Created content highlighting AI projects',
        'Increased participation in hackathons'
      ],
      icon: '📱',
      color: 'purple'
    },
    {
      title: 'Core Team Member',
      period: '2024',
      organization: 'Hackverse Hackathon',
      description: 'Collaborated with faculty and sponsors to structure and manage Hackverse, a hackathon at IILM. Handled logistics, judging coordination, and participant mentorship to ensure a seamless competition experience.',
      achievements: [
        'Structured and managed hackathon logistics',
        'Coordinated judging and evaluation process',
        'Provided participant mentorship',
        'Ensured seamless competition experience'
      ],
      icon: '🏆',
      color: 'green'
    }
  ];

  const achievements = [
    {
      title: 'Third World Innovation Patent & Copyright Conclave',
      achievement: '3rd Position',
      description: 'Secured 3rd position for an AI-based innovation prototype',
      icon: '🥉',
      color: 'yellow'
    },
    {
      title: 'Published Author',
      achievement: 'Book Chapter',
      description: 'Authored "AI and the Soul" - examining intersections between artificial intelligence, creativity, and consciousness',
      icon: '📚',
      color: 'cyan'
    },
    {
      title: 'Creative Writer',
      achievement: 'Portfolio',
      description: 'Writes poetry and short fiction exploring technology, emotion, and creativity - featured on personal portfolio',
      icon: '✒️',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-500/20 hover:border-blue-500/50',
      purple: 'border-purple-500/20 hover:border-purple-500/50',
      green: 'border-green-500/20 hover:border-green-500/50',
      yellow: 'border-yellow-500/20 hover:border-yellow-500/50',
      cyan: 'border-cyan-500/20 hover:border-cyan-500/50'
    };
    return colors[color as keyof typeof colors];
  };

  const getTextColor = (color: string) => {
    const colors = {
      blue: 'text-blue-400',
      purple: 'text-purple-400',
      green: 'text-green-400',
      yellow: 'text-yellow-400',
      cyan: 'text-cyan-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-green-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase animate-slide-up">Leadership</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-slide-up delay-200">
            LEADERSHIP & <span className="italic text-purple-400">ACHIEVEMENTS</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-slide-up delay-300">
            Beyond technical expertise, I lead with vision and drive positive change through active participation 
            in university organizations, hackathons, and creative pursuits. My leadership roles demonstrate 
            commitment to community building and innovation.
          </p>
        </div>

        {/* Leadership Roles */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-blue-400 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Leadership Roles
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          </h3>
          
          <div className="space-y-8">
            {leadershipRoles.map((role, index) => (
              <div
                key={index}
                className={`p-8 bg-slate-800/50 rounded-xl border transition-all duration-300 hover:transform hover:scale-105 ${getColorClasses(role.color)} animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 ${role.color === 'blue' ? 'bg-blue-500/20' : role.color === 'purple' ? 'bg-purple-500/20' : 'bg-green-500/20'} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl">{role.icon}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h4 className={`text-xl font-bold ${getTextColor(role.color)} mb-2 md:mb-0`}>
                        {role.title}
                      </h4>
                      <span className="text-sm text-gray-400 font-medium">
                        {role.period}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {role.description}
                    </p>
                    
                    <div className="mb-4">
                      <span className="text-sm text-gray-400 font-medium">Organization: </span>
                      <span className="text-white font-semibold">{role.organization}</span>
                    </div>
                    
                    <div>
                      <h5 className="text-white font-semibold text-sm mb-2">Key Achievements:</h5>
                      <ul className="space-y-1">
                        {role.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start text-gray-400 text-sm">
                            <span className={`w-2 h-2 ${role.color === 'blue' ? 'bg-blue-400' : role.color === 'purple' ? 'bg-purple-400' : 'bg-green-400'} rounded-full mr-3 mt-1.5 flex-shrink-0`}></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-purple-400 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></span>
            Notable Achievements
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-6 bg-slate-800/50 rounded-xl border transition-all duration-300 hover:transform hover:scale-105 ${getColorClasses(achievement.color)} animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 ${achievement.color === 'yellow' ? 'bg-yellow-500/20' : achievement.color === 'cyan' ? 'bg-cyan-500/20' : 'bg-purple-500/20'} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{achievement.icon}</span>
                  </div>
                  
                  <h4 className={`text-lg font-bold ${getTextColor(achievement.color)} mb-2`}>
                    {achievement.title}
                  </h4>
                  
                  <div className={`text-sm font-semibold ${getTextColor(achievement.color)} mb-3`}>
                    {achievement.achievement}
                  </div>
                  
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-slide-up delay-1000">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
          >
            Let's Collaborate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leadership;
