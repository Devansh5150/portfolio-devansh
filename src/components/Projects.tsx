
import { Button } from './ui/button';

const Projects = () => {
  const projects = [
    {
      title: 'Stock Predictor',
      status: 'Completed',
      description: 'AI/ML-based stock price forecasting tool that analyzes market trends and provides accurate predictions using advanced machine learning algorithms.',
      tech: ['Python', 'TensorFlow', 'Pandas', 'scikit-learn'],
      image: '📈',
      category: 'AI/ML'
    },
    {
      title: '2D to 3D Image Converter',
      status: 'In Progress',
      description: 'Innovative computer vision project that transforms 2D images into immersive 3D models using deep learning techniques.',
      tech: ['Python', 'OpenCV', 'PyTorch', '3D Modeling'],
      image: '🔄',
      category: 'Computer Vision'
    },
    {
      title: 'Saarthi - AI Truck Management',
      status: 'In Progress',
      description: 'Comprehensive AI-powered truck management system designed to optimize logistics, route planning, and fleet management.',
      tech: ['AI/ML', 'React', 'Node.js', 'MongoDB'],
      image: '🚛',
      category: 'AI Solutions'
    },
    {
      title: 'T.O.R.Q. - Roadside Assistance',
      status: 'In Progress',
      description: 'Fuel and roadside assistance platform connecting drivers with service providers through an intelligent matching system.',
      tech: ['React Native', 'Firebase', 'Google Maps API'],
      image: '🛣️',
      category: 'Mobile App'
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'Completed' ? 'text-green-400 bg-green-400/20' : 'text-yellow-400 bg-yellow-400/20';
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            MY FEATURED <span className="italic text-purple-400">PROJECTS</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Explore my innovative projects that showcase expertise in AI/ML, web development, 
            and creative problem-solving. Each project represents a step forward in technological innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden hover:transform hover:scale-105"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl">{project.image}</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <span className="text-xs text-cyan-400 font-medium uppercase tracking-wide">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-slate-700 text-cyan-400 text-xs rounded-full border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black flex-1 transition-all duration-300"
                  >
                    View Details
                  </Button>
                  {project.status === 'Completed' && (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 text-black hover:from-cyan-600 hover:to-purple-600 flex-1 transition-all duration-300"
                    >
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-slate-800/30 rounded-lg">
            <div className="text-3xl font-bold text-cyan-400 mb-2">4+</div>
            <div className="text-sm text-gray-400">Total Projects</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-lg">
            <div className="text-3xl font-bold text-green-400 mb-2">1</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-lg">
            <div className="text-3xl font-bold text-yellow-400 mb-2">3</div>
            <div className="text-sm text-gray-400">In Progress</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-lg">
            <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-sm text-gray-400">Satisfaction</div>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-black font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105"
            onClick={() => window.open('https://github.com/Devansh5150', '_blank')}
          >
            View All Projects
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
