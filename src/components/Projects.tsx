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

  const projects = [
    {
      title: 'Torq - AI Emergency Vehicle Support',
      status: 'Completed',
      description: 'CEO-led AI-powered on-demand emergency vehicle support platform providing fuel delivery and roadside assistance through real-time tracking, secure payments, and OpenAI-based chatbot for assistance.',
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
      impact: 'Provided emergency assistance to 500+ users, demonstrating entrepreneurial skills and end-to-end product development from ideation to deployment',
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '6 months',
      team: 'CEO & Lead Developer',
      awards: ['Startup Innovation Award']
    },
    {
      title: 'Tatvam - AI Contextual Mapping Engine',
      status: 'Completed',
      description: 'An LLM-powered contextual mapping platform that connects ancient wisdom with modern AI, providing personalized spiritual and philosophical guidance through ethical guardrails and subscription-based access.',
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
      impact: 'Created a novel AI application that bridges technology and philosophy, demonstrating expertise in LLM engineering, ethical AI design, and scalable cloud architecture',
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '4 months',
      team: 'Lead AI Engineer',
      awards: ['Innovation in AI Ethics']
    },
    {
      title: 'Minto - Last-Mile Delivery Platform',
      status: 'Completed',
      description: 'Hackathon project - Built a last-mile delivery platform aimed at empowering small vendors in Tier-2 and Tier-3 cities. Eliminated dark-store dependency and optimized local logistics using real-time order mapping.',
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
      impact: 'Empowered 50+ local vendors, improving their delivery efficiency by 40% and reducing customer wait times',
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '48 hours (Hackathon)',
      team: '4 members',
      awards: ['Best Social Impact Project']
    },
    {
      title: 'Mood-Based Spotify Player',
      status: 'Completed',
      description: 'Real-time emotion-based music recommendation system that detects user mood through facial expressions and plays matching Punjabi tracks via Spotify. Integrated DeepFace for emotion recognition, OpenCV for live video processing, and Spotify API for dynamic playlist control.',
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
      impact: 'Enhanced music discovery experience for users, demonstrating practical AI applications in entertainment and personalization',
      github: 'https://github.com/Devansh5150',
      demo: '#',
      timeline: '3 months',
      team: 'Solo Project',
      awards: ['Best AI Innovation Award']
    },
    {
      title: 'AttainHub - OBE Automation Platform',
      status: 'Completed',
      description: 'Developed and maintained AttainHub, an institutional OBE (Outcome-Based Education) automation platform adopted within the college. Streamlined CO/PO mapping, attainment tracking, and accreditation reporting.',
      tech: ['Web Development', 'Database Design', 'Automation', 'React', 'Node.js'],
      image: '🎓',
      category: 'Educational Tech',
      problemStatement: 'Educational institutions struggle with manual CO/PO mapping and attainment tracking, leading to inconsistent accreditation reports and significant faculty workload.',
      detailedDescription: 'An institutional platform that automates the complex process of Outcome-Based Education (OBE) management. This system helps educational institutions maintain accreditation standards and track learning outcomes effectively.',
      architectureFlow: 'Faculty Dashboard → CO/PO Mapping Engine → Attainment Calculator → Report Generator → Admin Review Panel',
      architectureDetails: [
        'CO/PO mapping engine: Automated correlation matrix generation with customizable thresholds',
        'Attainment calculator: Weighted formula engine supporting direct and indirect attainment methods',
        'Report generator: One-click accreditation report generation in multiple formats',
        'Role-based access: Faculty, HOD, and Admin dashboards with permission-based views'
      ],
      features: [
        'Automated CO/PO mapping with correlation matrices',
        'Real-time attainment tracking and calculation',
        'One-click accreditation report generation',
        'Faculty dashboard with course management',
        'Student progress monitoring and analytics',
        'Role-based access control (Faculty/HOD/Admin)'
      ],
      challenges: [
        'Modeling complex educational workflows with varying accreditation standards',
        'Integrating data from multiple academic sources and formats',
        'Ensuring compliance with NBA/NAAC accreditation requirements',
        'Training faculty to adopt the digital workflow efficiently'
      ],
      impact: 'Reduced manual work by 80% for faculty, improved accreditation compliance across the institution',
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
      tech: ['Mobile Development', 'React Native', 'Supabase', 'UI/UX Design'],
      image: '👥',
      category: 'Educational Platform',
      problemStatement: 'Students lack structured access to faculty mentorship, and faculty struggle to track mentee progress across multiple students without a unified platform.',
      detailedDescription: 'A comprehensive mentorship platform that bridges the gap between students and faculty, facilitating meaningful academic relationships and goal-oriented guidance through smart matching and progress tracking.',
      architectureFlow: 'Student/Faculty App → Authentication Layer → Matching Algorithm → Goal Tracking Engine → Progress Dashboard → Notification System',
      architectureDetails: [
        'Smart matching: Algorithm considers academic interests, availability, and mentorship goals',
        'Goal tracking: Hierarchical goal system with milestones, deadlines, and progress percentages',
        'Communication: In-app messaging with session scheduling and calendar integration',
        'Analytics: Progress reports for both mentors and mentees with actionable insights'
      ],
      features: [
        'Smart mentor-mentee matching algorithm',
        'Hierarchical goal tracking with milestones',
        'Progress evaluation tools and dashboards',
        'In-app communication and scheduling',
        'Session history and feedback mechanisms',
        'Mobile-first responsive design'
      ],
      challenges: [
        'Designing an effective matching algorithm with limited initial data',
        'Building an intuitive goal tracking UX for non-technical users',
        'Ensuring data privacy for sensitive mentorship conversations',
        'Cross-platform mobile compatibility with React Native'
      ],
      impact: 'Facilitated 200+ mentor-mentee relationships, improving academic guidance quality and student satisfaction',
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
    const colors: Record<string, string> = {
      'AI/Computer Vision': 'text-pink-300',
      'Mobile App': 'text-blue-300',
      'Web Platform': 'text-green-300',
      'Educational Tech': 'text-orange-300',
      'Educational Platform': 'text-purple-300',
      'AI Platform': 'text-cyan-300'
    };
    return colors[category] || 'text-gray-300';
  };

  const getCategoryHoverColor = (category: string) => {
    const colors: Record<string, string> = {
      'AI/Computer Vision': 'group-hover:text-pink-300',
      'Mobile App': 'group-hover:text-blue-300',
      'Web Platform': 'group-hover:text-green-300',
      'Educational Tech': 'group-hover:text-orange-300',
      'Educational Platform': 'group-hover:text-purple-300',
      'AI Platform': 'group-hover:text-cyan-300'
    };
    return colors[category] || 'group-hover:text-gray-300';
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-white/70 text-sm font-semibold tracking-wide uppercase">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">Featured Projects</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Explore my innovative projects that showcase expertise in AI/ML, web development,
            and creative problem-solving. Click on any project to dive deeper into the case study!
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
              onClick={() => { setSelectedProject(index); setShowArchitecture(false); }}
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
                  <span className={`text-xs font-medium uppercase tracking-wide ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                  <h3 className={`text-xl font-bold text-white mt-1 mb-3 transition-colors ${getCategoryHoverColor(project.category)}`}>
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
            <div className="text-3xl font-bold text-cyan-400 mb-2">6+</div>
            <div className="text-sm text-gray-400">Total Projects</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 rounded-lg">
            <div className="text-3xl font-bold text-green-400 mb-2">6</div>
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

      {/* Project Detail Modal — Case Study View */}
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
                {/* Problem Statement */}
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Problem Statement</h3>
                  <p className="text-gray-300 leading-relaxed">{projects[selectedProject].problemStatement}</p>
                </div>

                {/* Project Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Project Overview</h3>
                  <p className="text-gray-300 leading-relaxed">{projects[selectedProject].detailedDescription}</p>
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
                            <p className="text-cyan-300 font-mono text-sm leading-relaxed">{projects[selectedProject].architectureFlow}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-2">Architecture Details</h4>
                            <div className="space-y-2">
                              {projects[selectedProject].architectureDetails.map((detail, index) => (
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
                    {projects[selectedProject].features.map((feature, index) => (
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
                    {projects[selectedProject].tech.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-cyan-400 border-cyan-500/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-3">Challenges Faced</h3>
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
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Impact / Outcome</h3>
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