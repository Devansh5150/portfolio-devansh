
const Services = () => {
  const services = [
    {
      icon: '🧠',
      title: 'AI & ML Engineering',
      tagline: 'For teams that need intelligent features — not just experiments.',
      description: 'Build production-ready AI features including recommendation engines, computer vision systems, LLM-powered tools, and NLP pipelines.',
      deliverables: [
        'Custom recommendation engine (collaborative, content-based, or hybrid)',
        'Computer vision pipeline (emotion detection, image classification)',
        'LLM integration with RAG, prompt engineering, and guardrails',
        'Model optimization for production (quantization, inference speed)',
        'End-to-end deployment on AWS or GCP'
      ],
      color: 'cyan'
    },
    {
      icon: '💻',
      title: 'Full-Stack Product Development',
      tagline: 'For founders who need an AI-native product built end-to-end.',
      description: 'Architecture, frontend, backend, database, APIs, deployment — from blank repo to live product.',
      deliverables: [
        'React/Next.js frontend with responsive, modern UI',
        'Node.js backend with REST APIs and database design',
        'React Native mobile apps',
        'Authentication, payments (Stripe/Razorpay), real-time features',
        'CI/CD pipeline setup and cloud deployment'
      ],
      color: 'blue'
    },
    {
      icon: '🎯',
      title: 'Technical Strategy & Consulting',
      tagline: 'For non-technical founders or teams evaluating AI feasibility.',
      description: 'Assess your idea\'s technical viability, design the system architecture, and define the roadmap before a single line of code.',
      deliverables: [
        'Technical feasibility assessment',
        'System architecture design document',
        'Technology stack recommendations',
        'MVP scoping and timeline estimation',
        'Ongoing technical advisory'
      ],
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-white/70 text-sm font-semibold tracking-wide uppercase">What I Offer</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-6 text-white">How I Can Help</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            I work with startup founders, research teams, and institutions that need
            production-grade AI or full-stack products — fast.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-6 md:p-8 bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">{service.icon}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                {service.title}
              </h3>

              <p className="text-cyan-400 text-sm font-medium mb-4 italic">
                {service.tagline}
              </p>

              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                {service.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-white font-semibold text-sm uppercase tracking-wide">Deliverables:</h4>
                <ul className="space-y-2">
                  {service.deliverables.map((deliverable, dIndex) => (
                    <li key={dIndex} className="flex items-start text-gray-400 text-sm">
                      <span className={`w-2 h-2 rounded-full mr-3 mt-1.5 flex-shrink-0 ${service.color === 'cyan' ? 'bg-cyan-400' :
                          service.color === 'blue' ? 'bg-blue-400' :
                            'bg-green-400'
                        }`}></span>
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white hover:bg-neutral-200 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 w-full sm:w-auto"
          >
            Start a Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
