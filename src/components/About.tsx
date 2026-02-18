import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Brain, Database, Palette, Users, BookOpen, Award, Lightbulb } from 'lucide-react';

const About = () => {
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories = [
    {
      name: 'Core AI Engineering',
      icon: Brain,
      color: 'text-pink-400',
      bgColor: 'bg-pink-400',
      skills: [
        { name: 'Python', proof: 'Mood Spotify Player, SkillSync Recommendation Engine' },
        { name: 'OpenAI API', proof: 'Torq Chatbot, Tatvam LLM Pipeline' },
        { name: 'LangChain', proof: 'Tatvam RAG Pipeline' },
        { name: 'DeepFace', proof: 'Emotion Recognition, Mood Player' },
        { name: 'OpenCV', proof: 'Real-time Video Processing' },
        { name: 'RAG Pipelines', proof: 'Tatvam Contextual Engine' }
      ]
    },
    {
      name: 'Full-Stack Product',
      icon: Code,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400',
      skills: [
        { name: 'React', proof: 'Portfolio, Minto, AttainHub' },
        { name: 'Next.js', proof: 'Tatvam, Minto Platform' },
        { name: 'Node.js', proof: 'Torq Backend, SkillSync API' },
        { name: 'React Native', proof: 'Torq Mobile App, Mentor-Mentee' },
        { name: 'TypeScript', proof: 'AttainHub, Enterprise Apps' },
        { name: 'Tailwind CSS', proof: 'All Frontend Projects' }
      ]
    },
    {
      name: 'Data & Infrastructure',
      icon: Database,
      color: 'text-green-400',
      bgColor: 'bg-green-400',
      skills: [
        { name: 'PostgreSQL', proof: 'Torq Database, SkillSync' },
        { name: 'Firebase', proof: 'Real-time Tracking, Auth' },
        { name: 'Supabase', proof: 'Minto, Mentor-Mentee App' },
        { name: 'AWS', proof: 'Tatvam (EC2, Lambda, CloudFront)' }
      ]
    },
    {
      name: 'Design & Leadership',
      icon: Palette,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400',
      skills: [
        { name: 'Figma', proof: 'Mobile & Web UI Design' },
        { name: 'UI/UX Design', proof: 'Mentor-Mentee, Minto' },
        { name: 'Technical Writing', proof: 'Published Book Chapter' },
        { name: 'Team Leadership', proof: 'Globe Club, Hackverse, SkillSync' }
      ]
    }
  ];

  const timeline = [
    {
      period: '2025 - Present',
      title: 'Tech Lead & AI Developer - SkillSync',
      description: 'Built the AI pipeline powering personalized student opportunity matching.',
      achievements: [
        'Recommendation engine (collaborative + content-based) - 85% relevance accuracy',
        'Web scraping pipeline aggregating 50+ sources',
        'CV parsing & job-fit scoring system using NLP'
      ],
      impact: 'Serving 1,000+ students with personalized opportunity matching',
      icon: Brain,
      color: 'text-purple-400'
    },
    {
      period: '2025',
      title: 'AI Research Intern - Emotions Lab',
      description: 'Researched multi-modal emotion detection for real-time applications.',
      achievements: [
        'Evaluated CNN vs Transformer architectures for facial expression recognition',
        '2× inference speed improvement through model quantization',
        '15% accuracy improvement in emotion detection'
      ],
      impact: 'Improved emotion detection accuracy by 15% and reduced inference latency by 50%',
      icon: Brain,
      color: 'text-pink-400'
    },
    {
      period: '2025 - Present',
      title: 'President - Globe Club, IILM University',
      description: 'Led interdisciplinary tech and cultural initiatives for 50+ members.',
      achievements: ['Events with 100+ participation', 'Cross-department collaborations', 'Grew membership by 40%'],
      impact: 'Enhanced campus culture and interdisciplinary learning',
      icon: Users,
      color: 'text-blue-400'
    },
    {
      period: '2024 - 2028',
      title: 'B.Tech CSE (AIML) - IILM University',
      description: 'AI/ML specialization · Research projects',
      achievements: ['AI/ML Specialization', 'Research Projects'],
      impact: 'Academic excellence with hands-on project experience',
      icon: BookOpen,
      color: 'text-green-400'
    }
  ];

  return (
    <div className="min-h-screen py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in px-2">
          <span className="text-white/70 text-sm font-semibold tracking-wide uppercase animate-slide-up">About</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 md:mt-4 mb-4 md:mb-6 text-white animate-slide-up delay-200">
            The Short Version
          </h2>
          <div className="text-gray-300 text-lg max-w-3xl mx-auto animate-slide-up delay-300 space-y-4">
            <p>
              I'm a Computer Science student at IILM University, specializing in AI/ML. I build end-to-end
              products - from recommendation engines and computer vision pipelines to full-stack web
              platforms - and I've done it for startups, research labs, and institutional tools used
              across my university.
            </p>
            <p>
              Right now I lead AI development at SkillSync, where I architect the recommendation and
              CV-analysis pipeline. Previously, I researched multi-modal emotion detection at Emotions Lab
              and founded Torq, a startup delivering on-demand roadside assistance. Outside code,
              I'm a published author exploring the intersection of AI and consciousness.{' '}
              <a
                href="https://linktr.ee/devansh.datta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-2"
              >
                Writing Portfolio →
              </a>
            </p>
          </div>
        </div>

        {/* Skills - Pill-based, no percentages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-cyan-400 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
            What I Work With
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, catIndex) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  className="p-6 rounded-xl border bg-black/60 border-white/15 hover:border-white/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${category.color}`} />
                    </div>
                    <h4 className="text-lg font-bold text-white">{category.name}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="relative">
                        <span
                          className={`px-3 py-1.5 text-sm rounded-full border border-white/20 text-white cursor-default transition-all duration-200 inline-block
                            ${hoveredSkill === skill.name ? 'bg-white/15 border-white/40' : 'hover:bg-white/10'}`}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          {skill.name}
                        </span>

                        <AnimatePresence>
                          {hoveredSkill === skill.name && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute z-20 bottom-full left-0 mb-2 px-3 py-2 bg-neutral-900 border border-white/20 rounded-lg text-xs text-gray-300 whitespace-nowrap shadow-xl"
                            >
                              <span className={`font-semibold ${category.color}`}>Used in:</span> {skill.proof}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-white flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-500"></span>
            My Journey
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-500"></span>
          </h3>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row gap-6 p-6 rounded-xl border transition-all duration-300 cursor-pointer ${activeTimelineItem === index
                  ? 'bg-black/70 border-white/30'
                  : 'bg-black/50 border-white/15 hover:border-white/30'
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
                    <span className="inline-block px-3 py-1 border border-white/30 text-white text-sm font-semibold rounded-full">
                      {item.period}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-300">{item.description}</p>

                  <AnimatePresence>
                    {activeTimelineItem === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 mt-4"
                      >
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-2">Key Outcomes:</h5>
                          <div className="flex flex-wrap gap-2">
                            {item.achievements.map((achievement, i) => (
                              <span key={i} className="px-3 py-1 text-xs rounded-full border border-white/30 text-white">
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 bg-black/60 border border-white/15 rounded-lg">
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

        {/* CTA */}
        <div className="text-center animate-slide-up delay-1400">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white hover:bg-neutral-200 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 w-full sm:w-auto"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;