const Leadership = () => {
  const leadershipRoles = [
    {
      title: 'President - Globe Club, IILM University',
      period: '2025 - Present',
      icon: '👑',
      achievements: [
        'Led interdisciplinary initiatives across 5+ university societies',
        'Coordinated events with 100+ student participation',
        'Grew club membership by 40%'
      ]
    },
    {
      title: 'Core Team - Hackverse Hackathon, IILM',
      period: '2024',
      icon: '🏆',
      achievements: [
        'Managed logistics for 200+ participants',
        'Coordinated judging panels with industry sponsors',
        'Provided real-time mentorship during competition'
      ]
    },
    {
      title: 'Social Media Head - Aisyntech',
      period: '2025',
      icon: '📱',
      achievements: [
        'Built cross-platform digital presence (Instagram, LinkedIn, Twitter)',
        'Designed AI/ML-focused content campaigns',
        'Established brand guidelines and content calendar'
      ]
    }
  ];

  return (
    <div className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-white/70 text-sm font-semibold tracking-wide uppercase animate-slide-up">Leadership</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-white animate-slide-up delay-200">
            Beyond Code
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-slide-up delay-300">
            Leading teams, organizing events, and building communities alongside technical work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {leadershipRoles.map((role, index) => (
            <div
              key={index}
              className="p-6 md:p-8 bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">{role.icon}</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white leading-tight">{role.title}</h4>
                  <span className="text-sm text-gray-400">{role.period}</span>
                </div>
              </div>

              <ul className="space-y-2">
                {role.achievements.map((achievement, aIndex) => (
                  <li key={aIndex} className="flex items-start text-gray-400 text-sm">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
