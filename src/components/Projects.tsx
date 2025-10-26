import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { ExternalLink, Github, Play, Code, Users, Award, Calendar, Zap } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'Mood-Based Spotify Player',
      status: 'Completed',
      description: 'Real-time emotion-based music recommendation system that detects user mood through facial expressions and plays matching Punjabi tracks via Spotify. Integrated DeepFace for emotion recognition, OpenCV for live video processing, and Spotify API for dynamic playlist control.',
      tech: ['Python', 'OpenCV', 'DeepFace', 'Spotify API', 'pyttsx3'],
      image: '🎵',
      category: 'AI/Computer Vision',
      detailedDescription: 'An innovative AI-powered music player that revolutionizes how we discover music. Using advanced computer vision techniques, the system analyzes facial expressions in real-time to understand emotional states and curates personalized playlists.',
      features: [
        'Real-time facial emotion detection',
        'Dynamic Spotify playlist generation',
        'Voice feedback with pyttsx3',
        'Multi-language support (Punjabi focus)',
        'Machine learning model training',
        'Cross-platform compatibility'
      ],
      challenges: [
        'Optimizing emotion detection accuracy',
        'Real-time video processing performance',
        'Spotify API rate limiting',
        'Cross-cultural music recommendation'
      ],
      impact: 'Enhanced music discovery experience for users, demonstrating practical AI applications in entertainment',
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '3 months',
      team: 'Solo Project',
      awards: ['Best AI Innovation Award']
    },
    {
      title: 'Torq - AI Emergency Vehicle Support',
      status: 'Completed',
      description: 'CEO-led AI-powered on-demand emergency vehicle support platform providing fuel delivery and roadside assistance through real-time tracking, secure payments, and OpenAI-based chatbot for assistance.',
      tech: ['React Native', 'Node.js', 'Firebase', 'PostgreSQL', 'OpenAI API'],
      image: '🚗',
      category: 'Mobile App',
      detailedDescription: 'A comprehensive emergency vehicle support platform that connects drivers with service providers through intelligent matching. Built as a startup venture, this platform addresses real-world problems in emergency vehicle assistance.',
      features: [
        'Real-time GPS tracking',
        'AI-powered chatbot assistance',
        'Secure payment integration',
        'Multi-vendor marketplace',
        'Emergency response system',
        'User rating and feedback'
      ],
      challenges: [
        'Real-time location accuracy',
        'Payment security implementation',
        'AI chatbot training',
        'Scalable architecture design'
      ],
      impact: 'Provided emergency assistance to 500+ users, demonstrating entrepreneurial skills and AI integration',
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '6 months',
      team: 'CEO & Lead Developer',
      awards: ['Startup Innovation Award']
    },
    {
      title: 'Minto - Last-Mile Delivery Platform',
      status: 'Completed',
      description: 'Hackathon project - Built a last-mile delivery platform aimed at empowering small vendors in Tier-2 and Tier-3 cities. Eliminated dark-store dependency and optimized local logistics using real-time order mapping.',
      tech: ['Next.js', 'Node.js', 'Supabase', 'Tailwind CSS'],
      image: '📦',
      category: 'Web Platform',
      detailedDescription: 'A social impact project designed to empower local vendors in smaller cities by providing them with efficient delivery solutions. The platform eliminates the need for expensive dark stores while optimizing logistics.',
      features: [
        'Vendor onboarding system',
        'Real-time order tracking',
        'Local logistics optimization',
        'Mobile-responsive design',
        'Analytics dashboard',
        'Multi-language support'
      ],
      challenges: [
        'Complex logistics algorithms',
        'Vendor adoption strategies',
        'Real-time order management',
        'Scalable database design'
      ],
      impact: 'Empowered 50+ local vendors, improving their delivery efficiency by 40%',
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '48 hours (Hackathon)',
      team: '4 members',
      awards: ['Best Social Impact Project']
    },
    {
      title: 'AttainHub - OBE Automation Platform',
      status: 'Completed',
      description: 'Developed and maintained AttainHub, an institutional OBE (Outcome-Based Education) automation platform adopted within the college. Streamlined CO/PO mapping, attainment tracking, and accreditation reporting.',
      tech: ['Web Development', 'Database Design', 'Automation'],
      image: '🎓',
      category: 'Educational Tech',
      detailedDescription: 'An institutional platform that automates the complex process of Outcome-Based Education (OBE) management. This system helps educational institutions maintain accreditation standards and track learning outcomes effectively.',
      features: [
        'Automated CO/PO mapping',
        'Real-time attainment tracking',
        'Accreditation report generation',
        'Faculty dashboard',
        'Student progress monitoring',
        'Compliance reporting'
      ],
      challenges: [
        'Complex educational workflows',
        'Data integration from multiple sources',
        'Accreditation compliance',
        'User training and adoption'
      ],
      impact: 'Reduced manual work by 80% for faculty, improved accreditation compliance',
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '4 months',
      team: 'Lead Developer',
      awards: ['Institutional Excellence Award']
    },
    {
      title: 'Mentor-Mentee App',
      status: 'Completed',
      description: 'Designed and developed a digital platform connecting students and faculty for mentorship scheduling, goal tracking, and progress evaluation. Enhanced student-faculty communication and academic guidance efficiency. Built the entire frontend.',
      tech: ['Mobile Development', 'Database Management', 'UI/UX'],
      image: '👥',
      category: 'Educational Platform',
      detailedDescription: 'A comprehensive mentorship platform that bridges the gap between students and faculty, facilitating meaningful academic relationships and goal-oriented guidance.',
      features: [
        'Smart matching algorithm',
        'Goal tracking system',
        'Progress evaluation tools',
        'Communication platform',
        'Scheduling system',
        'Feedback mechanisms'
      ],
      challenges: [
        'Matching algorithm optimization',
        'User engagement strategies',
        'Privacy and security',
        'Cross-platform compatibility'
      ],
      impact: 'Facilitated 200+ mentor-mentee relationships, improving academic guidance quality',
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '3 months',
      team: 'Frontend (solo)',
      awards: ['Best Educational Innovation']
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'Completed' ? 'text-green-400 bg-green-400/20' : 'text-yellow-400 bg-yellow-400/20';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'AI/Computer Vision': 'from-purple-500 to-pink-500',
      'Mobile App': 'from-blue-500 to-cyan-500',
      'Web Platform': 'from-green-500 to-emerald-500',
      'Educational Tech': 'from-orange-500 to-red-500',
      'Educational Platform': 'from-indigo-500 to-purple-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-white/70 text-sm font-semibold tracking-wide uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">Featured Projects</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Explore my innovative projects that showcase expertise in AI/ML, web development, 
            and creative problem-solving. Click on any project to dive deeper into the details!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl">{project.image}</div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(project.status)} border-0`}>
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {project.timeline}
                    </Badge>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className={`text-xs font-medium uppercase tracking-wide ${
                    project.category === 'AI/Computer Vision' ? 'text-pink-300' :
                    project.category === 'Mobile App' ? 'text-blue-300' :
                    project.category === 'Web Platform' ? 'text-green-300' :
                    'text-orange-300'
                  }`}>
                    {project.category}
                  </span>
                  <h3 className={`text-xl font-bold text-white mt-1 mb-3 transition-colors ${
                    project.category === 'AI/Computer Vision' ? 'group-hover:text-pink-300' :
                    project.category === 'Mobile App' ? 'group-hover:text-blue-300' :
                    project.category === 'Web Platform' ? 'group-hover:text-green-300' :
                    'group-hover:text-orange-300'
                  }`}>
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
                      className="px-3 py-1 text-xs rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white text-white hover:bg-white hover:text-black flex-1 transition-all duration-300 w-full sm:w-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(index);
                    }}
                  >
                    <Code className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>

                <AnimatePresence>
                  {hoveredProject === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-3 bg-slate-900/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {project.team}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.timeline}
                        </div>
                        {project.awards.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {project.awards[0]}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-slate-800/30 rounded-lg">
            <div className="text-3xl font-bold text-cyan-400 mb-2">5+</div>
            <div className="text-sm text-gray-400">Total Projects</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-lg">
            <div className="text-3xl font-bold text-green-400 mb-2">5</div>
            <div className="text-sm text-gray-400">Completed</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-lg">
            <div className="text-3xl font-bold text-yellow-400 mb-2">3rd</div>
            <div className="text-sm text-gray-400">Patent Conclave</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-lg">
            <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-sm text-gray-400">Satisfaction</div>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-600 hover:to-cyan-600 text-black font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            onClick={() => window.open('https://github.com/Devansh5150', '_blank')}
          >
            <Github className="w-5 h-5 mr-2" />
            View All Projects
          </Button>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl">{projects[selectedProject].image}</span>
                  {projects[selectedProject].title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Project Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Project Overview</h3>
                  <p className="text-gray-300 leading-relaxed">{projects[selectedProject].detailedDescription}</p>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {projects[selectedProject].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-300">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-3">Challenges & Solutions</h3>
                  <div className="space-y-2">
                    {projects[selectedProject].challenges.map((challenge, index) => (
                      <div key={index} className="p-3 bg-slate-800/50 rounded-lg">
                        <p className="text-gray-300">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact */}
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Impact</h3>
                  <p className="text-gray-300">{projects[selectedProject].impact}</p>
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Project Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timeline:</span>
                        <span className="text-white">{projects[selectedProject].timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Team:</span>
                        <span className="text-white">{projects[selectedProject].team}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <Badge className={getStatusColor(projects[selectedProject].status)}>
                          {projects[selectedProject].status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-2">Awards & Recognition</h3>
                    <div className="space-y-1">
                      {projects[selectedProject].awards.map((award, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].tech.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-cyan-400 border-cyan-500/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => window.open(projects[selectedProject].github, '_blank')}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                  {projects[selectedProject].demo !== '#' && (
                    <Button
                      onClick={() => window.open(projects[selectedProject].demo, '_blank')}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-black"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;