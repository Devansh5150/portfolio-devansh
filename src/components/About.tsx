import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Brain, Database, Palette, Zap, Terminal, Rocket, BookOpen, Award, Users, Lightbulb } from 'lucide-react';

const About = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);

  const skillCategories = {
    'AI/ML': {
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      skills: [
        { name: 'Python', level: 95, description: 'Machine Learning, Deep Learning, Computer Vision', projects: ['Mood-Based Spotify Player', 'CV Analyzer'], years: '3+ years' },
        { name: 'OpenAI API', level: 88, description: 'GPT Integration, Prompt Engineering, Fine-tuning', projects: ['Torq Chatbot', 'Content Generation'], years: '2+ years' },
        { name: 'Computer Vision', level: 85, description: 'OpenCV, DeepFace, Image Processing', projects: ['Emotion Recognition', '2D to 3D Converter'], years: '2+ years' },
        { name: 'Data Analysis', level: 90, description: 'Pandas, NumPy, Statistical Modeling', projects: ['Recommendation Systems', 'Market Analysis'], years: '3+ years' }
      ]
    },
    'Frontend': {
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      skills: [
        { name: 'React.js', level: 88, description: 'Hooks, Context, State Management', projects: ['Portfolio', 'Minto Platform'], years: '2+ years' },
        { name: 'Next.js', level: 85, description: 'SSR, SSG, API Routes', projects: ['E-commerce Sites', 'Blog Platforms'], years: '2+ years' },
        { name: 'TypeScript', level: 82, description: 'Type Safety, Interfaces', projects: ['Enterprise Apps', 'Component Libraries'], years: '1+ years' },
        { name: 'Tailwind CSS', level: 90, description: 'Responsive Design, Animations', projects: ['UI Components', 'Design Systems'], years: '2+ years' }
      ]
    },
    'Backend': {
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      skills: [
        { name: 'Node.js', level: 85, description: 'Express, REST APIs, Microservices', projects: ['Torq Backend', 'Minto API'], years: '2+ years' },
        { name: 'PostgreSQL', level: 80, description: 'Database Design, Queries, Optimization', projects: ['User Management', 'Analytics'], years: '2+ years' },
        { name: 'Firebase', level: 88, description: 'Real-time DB, Authentication', projects: ['Real-time Chat', 'Push Notifications'], years: '2+ years' },
        { name: 'AWS', level: 75, description: 'Cloud Services, Deployment', projects: ['Scalable Apps', 'CI/CD'], years: '1+ years' }
      ]
    },
    'Creative': {
      icon: Palette,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      skills: [
        { name: 'UI/UX Design', level: 85, description: 'Figma, User Research, Prototyping', projects: ['Mobile Apps', 'Web Interfaces'], years: '2+ years' },
        { name: 'Writing', level: 92, description: 'Technical Writing, Poetry, Content', projects: ['Published Book Chapter', 'Blog Posts'], years: '4+ years' },
        { name: 'Leadership', level: 90, description: 'Team Management, Event Planning', projects: ['Globe Club', 'Hackathons'], years: '2+ years' },
        { name: 'Innovation', level: 88, description: 'Problem Solving, Ideation', projects: ['Patent Conclave', 'Startup Ideas'], years: '3+ years' }
      ]
    }
  };

  const skillDetails = {
    'AI/ML': {
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      description: 'Building intelligent systems that learn and adapt. From emotion recognition to recommendation engines, I create AI solutions that understand human behavior.',
      achievements: ['3rd Place Patent Conclave', 'Published Book Chapter', 'CV Analyzer at SkillSync'],
      tools: ['Python', 'OpenCV', 'DeepFace', 'TensorFlow']
    },
    'Frontend': {
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      description: 'Crafting beautiful, responsive interfaces that users love. Every pixel matters.',
      achievements: ['Portfolio Website', 'Minto Platform', 'Mobile Apps'],
      tools: ['React', 'Next.js', 'TypeScript', 'Tailwind']
    },
    'Backend': {
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      description: 'Building robust, scalable systems that power millions of users.',
      achievements: ['Real-time APIs', 'Database Optimization', 'Cloud Deployment'],
      tools: ['Node.js', 'PostgreSQL', 'Firebase', 'AWS']
    },
    'Creative': {
      icon: Palette,
      color: 'from-orange-500 to-red-500',
      description: 'Blending technology with creativity to tell compelling stories.',
      achievements: ['Published Author', 'Event Leadership', 'UI/UX Design'],
      tools: ['Figma', 'Writing', 'Design Thinking', 'Innovation']
    }
  };

  const timeline = [
    {
      period: '2025 - Present',
      title: 'Tech Lead & AI Developer at SkillSync',
      description: 'Building recommendation models, web scrapers, and CV analyzers for personalized student opportunities and content discovery.',
      achievements: ['Built CV Analyzer', 'Recommendation Engine', 'Web Scraper'],
      impact: 'Helped 1000+ students find opportunities',
      icon: Brain,
      color: 'text-purple-400'
    },
    {
      period: '2025 - Present',
      title: 'President - Globe Club (B.Tech Branch)',
      description: 'Leading interdisciplinary learning and cultural engagement across departments, overseeing event planning and member coordination.',
      achievements: ['Organized 5+ Events', 'Led 50+ Members', 'Cross-department Collaboration'],
      impact: 'Enhanced campus culture',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      period: '2024 - 2028',
      title: 'B.Tech CSE (AIML) at IILM University',
      description: 'Pursuing Computer Science Engineering with specialization in Artificial Intelligence and Machine Learning.',
      achievements: ['3.8+ GPA', 'AI/ML Focus', 'Research Projects'],
      impact: 'Academic excellence',
      icon: BookOpen,
      color: 'text-green-400'
    },
    {
      period: '2024',
      title: 'Core Team Member - Hackverse Hackathon',
      description: 'Collaborated with faculty and sponsors to structure and manage Hackverse hackathon, handling logistics and participant mentorship.',
      achievements: ['200+ Participants', 'Smooth Execution', 'Mentorship'],
      impact: 'Successful hackathon',
      icon: Award,
      color: 'text-yellow-400'
    },
    {
      period: '2022 - 2024',
      title: 'Ryan International School, Sohna Road',
      description: 'Completed Class XII CBSE with First Division, strong foundation in mathematics and science.',
      achievements: ['First Division', 'Science Focus', 'Leadership Roles'],
      impact: 'Strong foundation',
      icon: Lightbulb,
      color: 'text-orange-400'
    }
  ];

  const categories = Object.keys(skillCategories);

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase animate-slide-up">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-slide-up delay-200">
            AI DEVELOPER, INNOVATOR
            <br />
            <span className="italic text-3xl md:text-4xl text-purple-400 hover:text-cyan-400 transition-colors duration-500">& CREATIVE WRITER</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto animate-slide-up delay-300">
            As a dedicated Computer Science student specializing in AI/ML at IILM University, I bring fresh perspectives 
            to technology challenges. Currently serving as Tech Lead & AI Developer at SkillSync, I build recommendation 
            models and CV analyzers. Beyond technology, I lead as President of Globe Club and express my creativity through 
            poetry and content writing, bringing a unique blend of technical expertise and artistic vision to everything I create.
          </p>
        </div>

        {/* Interactive Skills Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-cyan-400 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            Interactive Skills Explorer
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            </h3>
          
          {/* Category Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === 'all' 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-black' 
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Skills
            </motion.button>
            {categories.map((category) => {
              const cat = skillCategories[category as keyof typeof skillCategories];
              const Icon = cat.icon;
              return (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category 
                      ? `bg-gradient-to-r ${cat.color} text-black` 
                      : `${cat.bgColor} ${cat.borderColor} border text-gray-300 hover:bg-slate-700/50`
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                  {category}
                </motion.button>
              );
            })}
          </div>

          {/* Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(selectedCategory === 'all' 
                ? Object.values(skillCategories).flatMap(cat => cat.skills)
                : skillCategories[selectedCategory as keyof typeof skillCategories]?.skills || []
              ).map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    selectedCategory === 'all' 
                      ? 'bg-slate-800/50 border-slate-700 hover:border-cyan-500/50' 
                      : `${skillCategories[selectedCategory as keyof typeof skillCategories].bgColor} ${skillCategories[selectedCategory as keyof typeof skillCategories].borderColor} border hover:border-opacity-50`
                  }`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-white">{skill.name}</h4>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Proficiency</span>
                      <span className="text-sm font-semibold text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-3">{skill.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 font-semibold">Key Projects:</p>
                    <div className="flex flex-wrap gap-1">
                      {skill.projects.map((project, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-700 text-xs text-cyan-400 rounded">
                          {project}
                        </span>
              ))}
            </div>
          </div>

                  <AnimatePresence>
                    {hoveredSkill === skill.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 p-3 bg-slate-900/50 rounded-lg"
                      >
                        <p className="text-xs text-gray-300">
                          💡 <strong>Fun Fact:</strong> {skill.name === 'Python' ? 'I wrote my first ML model at 16!' : 
                            skill.name === 'React.js' ? 'Built this portfolio in React!' :
                            skill.name === 'Writing' ? 'Published a book chapter on AI and consciousness!' :
                            'This skill helped me win multiple competitions!'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-purple-400 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></span>
            Interactive Journey Timeline
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></span>
          </h3>
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row gap-6 p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeTimelineItem === index 
                    ? 'bg-slate-800/70 border-purple-500/50' 
                    : 'bg-slate-800/30 border-slate-700 hover:border-purple-500/30'
                }`}
                whileHover={{ scale: 1.01 }}
                onClick={() => setActiveTimelineItem(activeTimelineItem === index ? null : index)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="md:w-32 flex-shrink-0">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-black text-sm font-semibold rounded-full">
                    {item.period}
                  </span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  
                  <AnimatePresence>
                    {activeTimelineItem === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <h5 className="text-sm font-semibold text-purple-400 mb-2">Key Achievements:</h5>
                          <div className="flex flex-wrap gap-2">
                            {item.achievements.map((achievement, i) => (
                              <span key={i} className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <p className="text-sm text-green-400">
                            <strong>Impact:</strong> {item.impact}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Poetry Sample */}
        <div className="mb-16 bg-slate-800/30 p-8 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 group hover:bg-slate-800/50 hover:shadow-2xl hover:shadow-blue-500/10 animate-slide-up delay-1200">
          <h3 className="text-2xl font-bold mb-6 text-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">My Creative Writing</h3>
          <div className="italic text-gray-300 text-center max-w-2xl mx-auto mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
            <p className="mb-4 hover:scale-105 transition-transform duration-300">
              "Through silicon valleys and digital realms,<br/>
              Where algorithms dance and logic overwhelms,<br/>
              I craft with code and write with heart,<br/>
              Blending science and poetry, never apart."
            </p>
            <p className="text-sm text-blue-400 font-semibold group-hover:text-blue-300 transition-colors duration-300">- Sample from my tech-inspired poetry collection</p>
          </div>
          <div className="text-center">
            <a
              href="https://linktr.ee/devansh.datta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 hover:text-blue-300"
            >
              View My Writing Portfolio
            </a>
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="text-center animate-slide-up delay-1400">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-cyan-500 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 animate-pulse"
          >
            Get In Touch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;