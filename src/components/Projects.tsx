import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { ExternalLink, Github, Code, Users, Award, Calendar, Zap, ChevronDown, ChevronUp } from 'lucide-react';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [showArchitecture, setShowArchitecture] = useState(false);

  const primaryProjects = [
    {
      title: 'Torq — AI Emergency Vehicle Support',
      status: 'Completed',
      description: 'On-demand roadside assistance platform connecting stranded drivers with service providers through AI matching and real-time tracking. Built as a startup, served 500+ users.',
      bullets: {
        problem: 'No unified real-time platform for emergency roadside service in remote areas',
        role: 'Founded and led product development end-to-end — architecture, AI chatbot, payment flow',
        impact: 'Served 500+ users · Modular microservice backend · Razorpay escrow integration'
      },
      tech: ['React Native', 'Node.js', 'Firebase', 'PostgreSQL', 'OpenAI API', 'Razorpay'],
      image: '🚗',
      category: 'Mobile App',
      problemStatement: 'Drivers stranded due to fuel shortages or vehicle breakdowns in remote areas face long wait times and unreliable service. There was no unified platform connecting emergency service providers with users in real-time.',
      detailedDescription: 'A comprehensive emergency vehicle support platform that connects drivers with service providers through intelligent matching. Built as a startup venture, this platform addresses real-world problems in emergency vehicle assistance with a modular backend architecture.',
      architectureFlow: 'User App → Backend API (Node.js + Express) → PostgreSQL Database → AI Layer (OpenAI GPT) → Payment Gateway (Razorpay) → Push Notifications (Firebase FCM)',
      architectureDetails: [
        'Modular backend: Auth Module, Service Matching Module, Payment Module, Notification Module',
        'Real-time tracking: Firebase Realtime DB + Geolocation API for live driver/provider positions',
        'OpenAI chatbot: Context-aware assistant trained on FAQ data for instant user support',
        'Payment flow: Razorpay integration with escrow-like hold until service completion'
      ],
      features: [
        'Real-time GPS tracking with live driver-provider matching',
        'AI-powered chatbot for instant assistance (OpenAI GPT)',
        'Secure payment integration with Razorpay escrow flow',
        'Multi-vendor marketplace with provider rating system',
        'Emergency SOS with priority routing',
        'Push notification pipeline via Firebase FCM'
      ],
      challenges: [
        'Achieving sub-second location accuracy for real-time tracking in low-connectivity zones',
        'Implementing secure payment escrow flow with Razorpay for service-based transactions',
        'Training the OpenAI chatbot with domain-specific emergency assistance context',
        'Designing a horizontally scalable microservice architecture for peak-load scenarios'
      ],
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '6 months',
      team: 'CEO & Lead Developer',
      awards: ['Startup Innovation Award']
    },
    {
      title: 'Tatvam — LLM Contextual Mapping Engine',
      status: 'Completed',
      description: 'LLM-powered platform connecting ancient philosophical texts with modern AI through RAG pipelines, ethical guardrails, and tiered subscription access.',
      bullets: {
        problem: 'Ancient philosophical knowledge is scattered and existing AI lacks cultural sensitivity',
        role: 'Designed the RAG pipeline, ethical guardrail system, and AWS deployment architecture',
        impact: 'Novel AI application bridging philosophy and technology · Stripe-based 3-tier access · Serverless AWS deployment'
      },
      tech: ['Next.js', 'Python', 'LangChain', 'OpenAI API', 'Supabase', 'Stripe', 'AWS'],
      image: '🧘',
      category: 'AI Platform',
      problemStatement: 'Spiritual and philosophical knowledge is scattered across ancient texts, making it inaccessible to modern seekers. Existing AI tools lack the contextual depth and ethical sensitivity needed for such guidance.',
      detailedDescription: 'Tatvam uses an LLM-based contextual mapping engine to bridge ancient philosophical traditions with modern AI capabilities. It provides personalized, ethically-grounded guidance while respecting cultural sensitivities through carefully designed guardrails.',
      architectureFlow: 'User Interface (Next.js) → API Gateway → LLM Contextual Engine (LangChain + OpenAI) → Vector DB (Embeddings) → Subscription Layer (Stripe) → Cloud Infrastructure (AWS)',
      architectureDetails: [
        'LLM Contextual Mapping: LangChain pipeline with custom prompt templates and retrieval-augmented generation (RAG)',
        'Subscription access control: Stripe-based tiered access (Free, Premium, Scholar) with Supabase RLS policies',
        'Ethical guardrails: Content filtering layer with sensitivity scoring and cultural respect checks',
        'Scalable cloud deployment: AWS EC2 + Lambda for burst traffic, CloudFront CDN for static assets'
      ],
      features: [
        'LLM-based contextual mapping engine with RAG pipeline',
        'Subscription access control system (Free/Premium/Scholar tiers)',
        'Ethical guardrails with sensitivity scoring',
        'Personalized guidance based on user context and history',
        'Vector database for semantic search across ancient texts',
        'Scalable cloud deployment on AWS infrastructure'
      ],
      challenges: [
        'Building a culturally sensitive LLM pipeline that respects philosophical traditions',
        'Implementing effective RAG with ancient texts that have multiple interpretations',
        'Designing subscription tiers with proper access control using Supabase RLS',
        'Deploying a cost-efficient serverless architecture on AWS for variable traffic'
      ],
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '4 months',
      team: 'Lead AI Engineer',
      awards: ['Innovation in AI Ethics']
    },
    {
      title: 'Minto — Last-Mile Delivery Platform',
      status: 'Completed',
      description: 'Delivery platform empowering Tier-2/3 city vendors by eliminating dark-store dependency. Built proximity-based delivery matching in 48 hours.',
      bullets: {
        problem: 'Small vendors in smaller cities can\'t afford dark-store logistics',
        role: 'Built real-time order mapping, vendor analytics dashboard, and delivery assignment algorithm',
        impact: '50+ vendors onboarded · 40% delivery efficiency improvement · Won Best Social Impact Project'
      },
      tech: ['Next.js', 'Node.js', 'Supabase', 'Tailwind CSS', 'Google Maps API'],
      image: '📦',
      category: 'Web Platform',
      problemStatement: 'Small vendors in Tier-2 and Tier-3 cities are excluded from the delivery economy due to expensive dark-store requirements and complex logistics systems designed for urban centers.',
      detailedDescription: 'A social impact project designed to empower local vendors in smaller cities by providing them with efficient delivery solutions. The platform eliminates the need for expensive dark stores while optimizing logistics through real-time order mapping and vendor analytics.',
      architectureFlow: 'Vendor Dashboard → Order Management API → Real-time Mapping Engine (Google Maps) → Delivery Assignment Algorithm → Customer Tracking Interface',
      architectureDetails: [
        'Vendor onboarding system: Multi-step registration with document verification and inventory setup',
        'Real-time order mapping: Google Maps API integration for live order tracking and delivery route optimization',
        'Vendor analytics dashboard: Sales trends, delivery performance metrics, and customer feedback aggregation',
        'Delivery assignment algorithm: Proximity-based matching with load balancing across available delivery agents'
      ],
      features: [
        'Vendor onboarding with multi-step registration and verification',
        'Real-time order mapping with Google Maps integration',
        'Vendor analytics dashboard with sales and performance metrics',
        'Proximity-based delivery assignment algorithm',
        'Mobile-responsive customer tracking interface',
        'Inventory management with low-stock alerts'
      ],
      challenges: [
        'Building a delivery assignment algorithm that works with sparse delivery networks in smaller cities',
        'Implementing real-time order tracking with Google Maps for multiple concurrent deliveries',
        'Designing a vendor analytics dashboard that surfaces actionable insights from limited data',
        'Optimizing database queries for real-time order management at scale'
      ],
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '48 hours (Hackathon)',
      team: '4 members',
      awards: ['Best Social Impact Project']
    },
    {
      title: 'Mood-Based Spotify Player',
      status: 'Completed',
      description: 'Real-time emotion detection via webcam → dynamic Spotify playlist generation. Detects 7 emotions through DeepFace and maps them to music genres.',
      bullets: {
        problem: 'Music recommendation relies on history, not real-time emotional state',
        role: 'Built the entire CV pipeline — face detection, emotion classification, Spotify OAuth, playlist generation',
        impact: 'Real-time emotion-to-music at 30fps · 7-emotion classification · Won Best AI Innovation Award'
      },
      tech: ['Python', 'OpenCV', 'DeepFace', 'Spotify API', 'pyttsx3'],
      image: '🎵',
      category: 'AI/Computer Vision',
      problemStatement: 'Music discovery is often manual and disconnected from the listener\'s emotional state. Existing recommendation systems rely on listening history rather than real-time emotional context.',
      detailedDescription: 'An innovative AI-powered music player that revolutionizes how we discover music. Using advanced computer vision techniques, the system analyzes facial expressions in real-time to understand emotional states and curates personalized playlists dynamically.',
      architectureFlow: 'Webcam Feed → OpenCV Preprocessing → DeepFace Emotion Classifier → Mood-to-Genre Mapping → Spotify API → Audio Playback + Voice Feedback (pyttsx3)',
      architectureDetails: [
        'Video pipeline: OpenCV captures frames, applies face detection, and sends cropped faces to DeepFace',
        'Emotion classification: DeepFace analyzes 7 emotions (happy, sad, angry, surprise, fear, disgust, neutral)',
        'Mood mapping: Custom algorithm maps detected emotions to Punjabi music genres and energy levels',
        'Spotify integration: OAuth2 flow with dynamic playlist generation and track queueing'
      ],
      features: [
        'Real-time facial emotion detection via DeepFace',
        'Dynamic Spotify playlist generation based on mood',
        'Voice feedback with pyttsx3 for accessibility',
        'Multi-language support with Punjabi music focus',
        'Emotion history tracking and mood timeline',
        'Cross-platform Python application'
      ],
      challenges: [
        'Optimizing emotion detection accuracy across diverse lighting conditions',
        'Real-time video processing performance at 30fps without frame drops',
        'Handling Spotify API rate limiting during rapid mood transitions',
        'Cross-cultural music recommendation with limited labeled Punjabi music data'
      ],
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '3 months',
      team: 'Solo Project',
      awards: ['Best AI Innovation Award']
    }
  ];

  const secondaryProjects = [
    {
      title: 'AttainHub',
      description: 'OBE automation platform adopted by my college. Automated CO/PO mapping, attainment tracking, and accreditation reporting.',
      impact: 'Reduced faculty manual work by 80%',
      tech: ['React', 'Node.js', 'Database Design'],
      image: '🎓',
      github: 'https://github.com/Devansh5150'
    },
    {
      title: 'Mentor-Mentee App',
      description: 'Mentorship scheduling and progress tracking platform. Built the entire frontend with smart matching and goal tracking.',
      impact: 'Facilitated 200+ mentor-mentee relationships',
      tech: ['React Native', 'Supabase', 'UI/UX Design'],
      image: '👥',
      github: 'https://github.com/Devansh5150'
    }
  ];

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
            End-to-end products — from architecture to deployment. Click any project for the full case study.
          </p>
        </div>

        {/* Primary Projects */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {primaryProjects.map((project, index) => (
            <motion.div
              key={index}
              className="group bg-black/60 rounded-xl border border-white/15 hover:border-white/30 transition-all duration-300 overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
              onClick={() => { setSelectedProject(index); setShowArchitecture(false); }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{project.image}</div>
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
                  >
                    <Code className="w-4 h-4 mr-2" />
                    View Case Study
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.github, '_blank');
                    }}
                  >
                    <Github className="w-4 h-4" />
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
                  <span className="text-2xl">{project.image}</span>
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
                  onClick={() => window.open(project.github, '_blank')}
                >
                  <Github className="w-4 h-4 mr-2" />
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
            onClick={() => window.open('https://github.com/Devansh5150', '_blank')}
          >
            <Github className="w-5 h-5 mr-2" />
            View All on GitHub
          </Button>
        </div>
      </div>

      {/* Project Detail Modal — Case Study View */}
      <AnimatePresence>
        {selectedProject !== null && (
          <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl">{primaryProjects[selectedProject].image}</span>
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

                {/* System Architecture — Expandable */}
                <div>
                  <button
                    onClick={() => setShowArchitecture(!showArchitecture)}
                    className="w-full flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-blue-400">System Architecture</h3>
                    {showArchitecture ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {showArchitecture && (
                      <motion.div
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
                                  <span className="w-1.5 h-1.5 mt-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
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
                        <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
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
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-300">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => window.open(primaryProjects[selectedProject].github, '_blank')}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                  {primaryProjects[selectedProject].demo !== '#' && (
                    <Button
                      onClick={() => window.open(primaryProjects[selectedProject].demo, '_blank')}
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