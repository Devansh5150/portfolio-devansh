import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { ExternalLink, Github, Code, Award, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { primaryProjects, secondaryProjects } from '../data/projects';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showArchitecture, setShowArchitecture] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'AI/Computer Vision': 'text-pink-300',
      'Mobile App': 'text-blue-300',
      'Web Platform': 'text-green-300',
      'AI Platform': 'text-cyan-300'
    };
    return colors[category] || 'text-gray-300';
  };

  const getCategoryHoverColor = (category: string) => {
    const colors: Record<string, string> = {
      'AI/Computer Vision': 'group-hover:text-pink-300',
      'Mobile App': 'group-hover:text-blue-300',
      'Web Platform': 'group-hover:text-green-300',
      'AI Platform': 'group-hover:text-cyan-300'
    };
    return colors[category] || 'group-hover:text-gray-300';
  };

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-white/70 text-sm font-semibold tracking-wide uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-white">What I've Built</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            End-to-end products - from architecture to deployment. Click any project for the full case study.
          </p>
        </div>

        {/* Primary Projects */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {primaryProjects.map((project, index) => (
            <motion.div
              key={index}
              className="group bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => { setSelectedProject(index); setShowArchitecture(false); }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl" aria-hidden="true">{project.image}</div>
                  <Badge variant="outline" className="text-xs">
                    {project.timeline}
                  </Badge>
                </div>

                <div className="mb-4">
                  <span className={`text-xs font-medium uppercase tracking-wide ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                  <h3 className={`text-xl font-bold text-white mt-1 mb-3 transition-colors ${getCategoryHoverColor(project.category)}`}>
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Problem / Role / Impact bullets */}
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex items-start gap-2 text-gray-300">
                    <span className="text-red-400 font-semibold text-xs mt-0.5 flex-shrink-0 w-14">Problem</span>
                    <span>{project.bullets.problem}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-300">
                    <span className="text-cyan-400 font-semibold text-xs mt-0.5 flex-shrink-0 w-14">My role</span>
                    <span>{project.bullets.role}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-300">
                    <span className="text-green-400 font-semibold text-xs mt-0.5 flex-shrink-0 w-14">Impact</span>
                    <span>{project.bullets.impact}</span>
                  </div>
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
                    className="border-white text-white hover:bg-white hover:text-black flex-1 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(index);
                      setShowArchitecture(false);
                    }}
                    aria-label={`View case study for ${project.title}`}
                  >
                    <Code className="w-4 h-4 mr-2" aria-hidden="true" />
                    View Case Study
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.github, '_blank', 'noopener,noreferrer');
                    }}
                    aria-label={`View source code for ${project.title} on GitHub`}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Projects */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-6 text-center">More Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {secondaryProjects.map((project, index) => (
              <motion.div
                key={index}
                className="p-6 bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl" aria-hidden="true">{project.image}</span>
                  <h4 className="text-lg font-bold text-white">{project.title}</h4>
                </div>
                <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                <p className="text-green-400 text-sm font-semibold mb-3">{project.impact}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-full border border-white/20 text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
                  onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
                  aria-label={`View code for ${project.title} on GitHub`}
                >
                  <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                  View Code
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-600 hover:to-cyan-600 text-black font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            onClick={() => window.open('https://github.com/Devansh5150', '_blank', 'noopener,noreferrer')}
            aria-label="View all projects on GitHub"
          >
            <Github className="w-5 h-5 mr-2" aria-hidden="true" />
            View All on GitHub
          </Button>
        </div>
      </div>

      {/* Project Detail Modal - Case Study View */}
      <AnimatePresence>
        {selectedProject !== null && (
          <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">{primaryProjects[selectedProject].image}</span>
                  {primaryProjects[selectedProject].title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Problem Statement */}
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Problem Statement</h3>
                  <p className="text-gray-300 leading-relaxed">{primaryProjects[selectedProject].problemStatement}</p>
                </div>

                {/* Project Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Project Overview</h3>
                  <p className="text-gray-300 leading-relaxed">{primaryProjects[selectedProject].detailedDescription}</p>
                </div>

                {/* System Architecture - Expandable */}
                <div>
                  <button
                    onClick={() => setShowArchitecture(!showArchitecture)}
                    className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300"
                    aria-expanded={showArchitecture}
                    aria-controls="architecture-details"
                  >
                    <h3 className="text-lg font-semibold text-blue-400">System Architecture</h3>
                    {showArchitecture ? <ChevronUp className="w-5 h-5 text-gray-400" aria-hidden="true" /> : <ChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />}
                  </button>
                  <AnimatePresence>
                    {showArchitecture && (
                      <motion.div
                        id="architecture-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-4 bg-slate-800/30 rounded-lg border border-white/10 space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-2">Architecture Flow</h4>
                            <p className="text-cyan-300 font-mono text-sm leading-relaxed">{primaryProjects[selectedProject].architectureFlow}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-2">Architecture Details</h4>
                            <div className="space-y-2">
                              {primaryProjects[selectedProject].architectureDetails.map((detail, index) => (
                                <div key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                                  <span className="w-1.5 h-1.5 mt-1.5 bg-blue-400 rounded-full flex-shrink-0" aria-hidden="true"></span>
                                  {detail}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {primaryProjects[selectedProject].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-300">
                        <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" aria-hidden="true" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {primaryProjects[selectedProject].tech.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-cyan-400 border-cyan-500/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-3">Challenges Faced</h3>
                  <div className="space-y-2">
                    {primaryProjects[selectedProject].challenges.map((challenge, index) => (
                      <div key={index} className="p-3 bg-slate-800/50 rounded-lg">
                        <p className="text-gray-300">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-2">Project Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timeline:</span>
                        <span className="text-white">{primaryProjects[selectedProject].timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Team:</span>
                        <span className="text-white">{primaryProjects[selectedProject].team}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-2">Awards & Recognition</h3>
                    <div className="space-y-1">
                      {primaryProjects[selectedProject].awards.map((award, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Award className="w-4 h-4 text-yellow-400" aria-hidden="true" />
                          <span className="text-gray-300">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => window.open(primaryProjects[selectedProject].github, '_blank', 'noopener,noreferrer')}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600"
                    aria-label="View code on GitHub"
                  >
                    <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                    View Code
                  </Button>
                  {primaryProjects[selectedProject].demo !== '#' && (
                    <Button
                      onClick={() => window.open(primaryProjects[selectedProject].demo, '_blank', 'noopener,noreferrer')}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-black"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
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