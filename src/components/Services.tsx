
const Services = () => {
  const services = [
    {
      icon: '🧠',
      title: 'AI/ML Solutions',
      description: 'Custom AI and machine learning solutions tailored to your business needs. From concept to deployment, I help transform your ideas into intelligent systems.',
      features: [
        'AI Strategy & Consulting',
        'Machine Learning Models',
        'Data Analysis & Insights',
        'Predictive Analytics',
        'Computer Vision',
        'Natural Language Processing'
      ],
      color: 'cyan'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Creating beautiful, intuitive, and user-focused designs that drive engagement and deliver exceptional user experiences across all platforms.',
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Interactive Design',
        'Mobile App Design',
        'Web Interface Design',
        'Brand Identity'
      ],
      color: 'purple'
    },
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Full-stack web development services using modern technologies to build scalable, performant, and maintainable web applications.',
      features: [
        'Frontend Development',
        'Backend APIs',
        'Database Design',
        'Cloud Deployment',
        'Performance Optimization',
        'Maintenance & Support'
      ],
      color: 'blue'
    },
    {
      icon: '🚀',
      title: 'Innovation Consulting',
      description: 'Strategic guidance for startups and businesses looking to leverage cutting-edge technology to solve complex problems and drive growth.',
      features: [
        'Technology Strategy',
        'Digital Transformation',
        'Startup Consulting',
        'Product Development',
        'Market Analysis',
        'Growth Planning'
      ],
      color: 'green'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: 'border-cyan-500/20 hover:border-cyan-500/50 text-cyan-400',
      purple: 'border-purple-500/20 hover:border-purple-500/50 text-purple-400',
      blue: 'border-blue-500/20 hover:border-blue-500/50 text-blue-400',
      green: 'border-green-500/20 hover:border-green-500/50 text-green-400'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconBgClasses = (color: string) => {
    const colors = {
      cyan: 'bg-cyan-500/20',
      purple: 'bg-purple-500/20',
      blue: 'bg-blue-500/20',
      green: 'bg-green-500/20'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">My Services</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            MY BEST QUALITY <span className="italic text-purple-400">SERVICES</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Comprehensive technology services designed to transform your ideas into reality. 
            From AI solutions to beautiful designs, I deliver excellence in every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group p-8 bg-slate-800/50 rounded-xl border transition-all duration-300 hover:transform hover:scale-105 ${getColorClasses(service.color)}`}
            >
              <div className={`w-16 h-16 ${getIconBgClasses(service.color)} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{service.icon}</span>
              </div>
              
              <h3 className={`text-2xl font-bold mb-4 ${service.color === 'cyan' ? 'text-cyan-400' : service.color === 'purple' ? 'text-purple-400' : service.color === 'blue' ? 'text-blue-400' : 'text-green-400'}`}>
                {service.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-3">
                <h4 className="text-white font-semibold text-sm uppercase tracking-wide">What's Included:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-400 text-sm">
                      <span className={`w-2 h-2 ${service.color === 'cyan' ? 'bg-cyan-400' : service.color === 'purple' ? 'bg-purple-400' : service.color === 'blue' ? 'bg-blue-400' : 'bg-green-400'} rounded-full mr-3 flex-shrink-0`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12">My Work Process</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your needs and requirements' },
              { step: '02', title: 'Planning', desc: 'Creating detailed project roadmap' },
              { step: '03', title: 'Development', desc: 'Building with latest technologies' },
              { step: '04', title: 'Delivery', desc: 'Testing, deployment, and support' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-black font-bold">{item.step}</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
