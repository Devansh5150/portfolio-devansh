const Leadership = () => {
  const leadershipRoles = [
    {
      title: 'President - Globe Club (B.Tech Branch)',
      period: '2025 - Present',
      organization: 'IILM University',
      description: 'Leading the Globe Club\'s B.Tech division, driving interdisciplinary learning initiatives and fostering cultural engagement across departments. Overseeing strategic event planning, cross-team collaborations, and member development programs.',
      achievements: [
        'Led interdisciplinary initiatives bridging technology, arts, and social sciences',
        'Coordinated academic and cultural events with 100+ student participation',
        'Managed cross-team collaborations between 5+ university societies',
        'Established structured mentorship programs within the club',
        'Spearheaded campus-wide engagement campaigns increasing club membership by 40%'
      ],
      icon: '👑',
      color: 'blue'
    },
    {
      title: 'Core Team Member - Hackverse Hackathon',
      period: '2024',
      organization: 'IILM University',
      description: 'Collaborated with faculty and sponsors to structure and execute Hackverse, managing end-to-end hackathon operations from logistics to judging coordination and participant mentorship.',
      achievements: [
        'Structured hackathon execution pipeline with clear timelines and deliverables',
        'Managed logistics for 200+ participants across multiple tracks',
        'Coordinated judging panels and evaluation criteria with industry sponsors',
        'Provided real-time mentorship to teams during the competition',
        'Ensured seamless competition experience from registration to prize distribution'
      ],
      icon: '🏆',
      color: 'green'
    },
    {
      title: 'Social Media Head - Aisyntech',
      period: '2025',
      organization: 'Aisyntech',
      description: 'Built and executed a comprehensive digital presence strategy for the tech club, designing creative tech-focused campaigns that significantly boosted engagement and participation in workshops and hackathons.',
      achievements: [
        'Built digital presence strategy across Instagram, LinkedIn, and Twitter',
        'Designed creative tech-focused campaigns highlighting AI and ML projects',
        'Increased workshop and hackathon participation through targeted content',
        'Created visual content series showcasing club achievements and member spotlights',
        'Developed a content calendar and brand guidelines for consistent club identity'
      ],
      icon: '📱',
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-white/70 text-sm font-semibold tracking-wide uppercase animate-slide-up">Leadership</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white animate-slide-up delay-200">
            Leadership & Community Impact
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-slide-up delay-300">
            Beyond technical expertise, I lead with vision and drive positive change through active participation
            in university organizations, hackathons, and creative pursuits. My leadership roles demonstrate
            commitment to community building and innovation.
          </p>
        </div>

        {/* Leadership Roles */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-white flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Leadership Roles
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          </h3>

          <div className="space-y-8">
            {leadershipRoles.map((role, index) => (
              <div
                key={index}
                className={`p-6 md:p-8 bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105 animate-slide-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl">{role.icon}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h4 className={`text-xl font-bold text-white mb-2 md:mb-0`}>
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
                      <h5 className="text-white font-semibold text-sm mb-2">Key Contributions:</h5>
                      <ul className="space-y-1">
                        {role.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start text-gray-400 text-sm">
                            <span className={`w-2 h-2 bg-blue-400 rounded-full mr-3 mt-1.5 flex-shrink-0`}></span>
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

        {/* Call to Action */}
        <div className="text-center animate-slide-up delay-1000">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white hover:bg-neutral-200 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 w-full sm:w-auto"
          >
            Let's Collaborate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leadership;
