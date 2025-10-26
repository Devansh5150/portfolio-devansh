
const Services = () => {
  const services = [
    {
      icon: '🧠',
      title: 'AI/ML Development',
      description: 'Custom AI and machine learning solutions including recommendation models, CV analyzers, and emotion recognition systems. Expertise in OpenAI API integration and prompt engineering.',
      features: [
        'Recommendation Systems',
        'Computer Vision (OpenCV, DeepFace)',
        'OpenAI API Integration',
        'Prompt Engineering',
        'Data Analysis & Insights',
        'Machine Learning Models'
      ],
      color: 'cyan'
    },
    {
      icon: '💻',
      title: 'Full-Stack Development',
      description: 'Complete web and mobile application development using modern technologies. From frontend React/Next.js to backend Node.js and database management.',
      features: [
        'React.js & Next.js',
        'Node.js Backend',
        'Mobile App Development',
        'Database Design (SQL, MongoDB)',
        'API Development',
        'Cloud Deployment (AWS)'
      ],
      color: 'blue'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Creating beautiful, intuitive, and user-focused designs that drive engagement. Experience with Tailwind CSS and modern design principles.',
      features: [
        'Responsive Web Design',
        'Mobile App UI/UX',
        'Tailwind CSS',
        'User Experience Design',
        'Interactive Prototypes',
        'Design System Creation'
      ],
      color: 'purple'
    },
    {
      icon: '✒️',
      title: 'Creative Writing & Content',
      description: 'Professional content creation including poetry, technical writing, and creative copy. Published author with expertise in technology-themed creative writing.',
      features: [
        'Technical Writing',
        'Creative Poetry',
        'Content Strategy',
        'Social Media Content',
        'Blog Writing',
        'Published Author'
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
          <span className="text-white/70 text-sm font-semibold tracking-wide uppercase">My Services</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 text-white">What I Offer</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Comprehensive technology services designed to transform your ideas into reality. 
            From AI solutions to beautiful designs, I deliver excellence in every project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group p-6 md:p-8 bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105`}
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">{service.icon}</span>
              </div>
              
              <h3 className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white`}>
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
                      <span className={
                        `w-2 h-2 rounded-full mr-3 flex-shrink-0 ` +
                        (
                          service.title === 'AI/ML Development' ? 'bg-pink-400' :
                          service.title === 'Full-Stack Development' ? 'bg-blue-400' :
                          service.title === 'UI/UX Design' ? 'bg-orange-400' :
                          'bg-green-400'
                        )
                      }></span>
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
          <h3 className="text-2xl font-bold text-center mb-12 text-white">My Work Process</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your needs and requirements' },
              { step: '02', title: 'Planning', desc: 'Creating detailed project roadmap' },
              { step: '03', title: 'Development', desc: 'Building with latest technologies' },
              { step: '04', title: 'Delivery', desc: 'Testing, deployment, and support' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">{item.step}</span>
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
            className="bg-white hover:bg-neutral-200 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 w-full sm:w-auto"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
