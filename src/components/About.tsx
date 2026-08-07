import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, timeline } from '../data/about';

const About = () => {
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="w-52 h-52 md:w-64 md:h-64 rounded-full border border-white/20 flex items-center justify-center relative shadow-[0_0_60px_rgba(255,255,255,0.15)] backdrop-blur-sm overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.15) 0%, rgba(25, 25, 25, 0.8) 60%, rgba(0, 0, 0, 0.95) 100%)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* Internal grid overlay inside avatar orb */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '28px 28px',
                  backgroundPosition: 'center',
                }}
                aria-hidden="true"
              />
              <div className="text-7xl md:text-8xl select-none z-10 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]" aria-hidden="true">
                👨‍💻
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 animate-pulse pointer-events-none" />
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Driving Innovation through <span className="text-white underline underline-offset-4 decoration-white/30">AI & Engineering</span>
                </h2>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  <p>
                    I'm a Full-Stack AI Engineer passionate about building systems that solve complex, real-world problems. 
                    From developing emergency vehicle support platforms to LLM-powered philosophical mapping engines, 
                    I focus on the intersection of scalability and human-centric design.
                  </p>
                  <p>
                    With deep expertise in <span className="text-white font-semibold">LLMs</span>, 
                    <span className="text-white font-semibold"> Mobile Systems</span>, and 
                    <span className="text-white font-semibold"> Machine Learning</span>, I turn conceptual 
                    complexities into robust digital products. Check out my 
                    <a
                      href="https://linktr.ee/devansh.datta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 transition-colors underline underline-offset-4 ml-1 font-medium"
                      aria-label="Visit Writing Portfolio on Linktree"
                    >
                      Writing Portfolio →
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Knowledge & Skills */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold mb-10 text-center text-white flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/40" aria-hidden="true"></span>
            Technical Expertise
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/40" aria-hidden="true"></span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  className="p-8 rounded-2xl bg-black/60 border border-white/15 hover:border-red-500/80 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all duration-300 group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h4 className="text-xl font-bold text-white tracking-tight">{category.name}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="relative">
                        <span
                          className={`px-3 py-1.5 text-sm rounded-full border border-white/10 text-gray-300 cursor-default transition-all duration-200 inline-block hover:border-white/40 hover:text-white hover:bg-white/5
                            ${hoveredSkill === skill.name ? 'bg-white/15 border-white/40' : ''}`}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          {skill.name}
                        </span>

                        <AnimatePresence>
                          {hoveredSkill === skill.name && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 5 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 5 }}
                              className="absolute z-20 bottom-full left-0 mb-3 px-4 py-2 bg-neutral-900 border border-white/20 rounded-xl text-xs text-gray-300 whitespace-nowrap shadow-2xl backdrop-blur-md"
                            >
                              <span className={`font-semibold ${category.color}`}>Used in:</span> {skill.proof}
                              <div className="absolute -bottom-1 left-4 w-2 h-2 bg-neutral-900 border-r border-b border-white/20 rotate-45"></div>
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
          <h3 className="text-2xl font-bold mb-10 text-center text-white flex items-center justify-center gap-3">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></span>
            Professional Journey
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></span>
          </h3>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row gap-8 p-8 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                  activeTimelineItem === index
                    ? 'bg-white/5 border-white/30'
                    : 'bg-black/40 border-white/10 hover:border-white/20'
                }`}
                whileHover={{ scale: 1.01 }}
                onClick={() => setActiveTimelineItem(activeTimelineItem === index ? null : index)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                aria-expanded={activeTimelineItem === index}
              >
                <div className="md:w-32 flex-shrink-0">
                  <div className="flex items-center gap-4 mb-3">
                    <item.icon className={`w-8 h-8 ${item.color}`} aria-hidden="true" />
                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-full tracking-widest uppercase">
                      {item.period}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-lg mb-4">{item.description}</p>

                  <AnimatePresence>
                    {activeTimelineItem === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6 pt-4 border-t border-white/10 mt-4"
                      >
                        <div>
                          <h5 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3">Key Outcomes</h5>
                          <div className="flex flex-wrap gap-2">
                            {item.achievements.map((achievement, i) => (
                              <span key={i} className="px-4 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 text-white">
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-green-400/5 border border-green-400/20 rounded-xl">
                          <p className="text-green-400 text-sm leading-relaxed">
                            <span className="font-bold mr-2">Core Impact:</span> {item.impact}
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
        <div className="text-center pt-10">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-10 py-4 bg-white hover:bg-neutral-200 text-black font-bold rounded-xl transition-all duration-300 overflow-hidden"
            aria-label="Scroll to contact section"
          >
            <span className="relative z-10">Start a Conversation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;