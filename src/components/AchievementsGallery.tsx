import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Medal, Star, BookOpen, Users, Code, Zap, Calendar, MapPin } from 'lucide-react';

const AchievementsGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null);

  const achievements = [
    {
      id: 1,
      title: "3rd Place - Patent Conclave",
      category: "Competition",
      year: "2024",
      location: "IILM University",
      description: "Secured 3rd position in the prestigious Patent Conclave competition, showcasing innovative thinking and technical expertise in AI/ML solutions.",
      details: "Presented an innovative AI-powered solution that addressed real-world problems. The competition involved multiple rounds including ideation, prototyping, and presentation to industry experts.",
      impact: "Recognition from faculty and industry professionals, validation of technical skills and innovative thinking",
      skills: ["AI/ML", "Innovation", "Presentation", "Problem Solving"],
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30"
    },
    {
      id: 2,
      title: "Published Book Chapter",
      category: "Writing",
      year: "2024",
      location: "Academic Publication",
      description: "Co-authored a book chapter on AI and consciousness, contributing to academic discourse on artificial intelligence and human cognition.",
      details: "The chapter explores the intersection of artificial intelligence and human consciousness, discussing philosophical implications and technical challenges in creating truly intelligent systems.",
      impact: "Contribution to academic literature, establishment as a thought leader in AI discourse",
      skills: ["Technical Writing", "AI Research", "Critical Thinking", "Academic Writing"],
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      id: 3,
      title: "President - Globe Club",
      category: "Leadership",
      year: "2025 - Present",
      location: "IILM University",
      description: "Leading interdisciplinary learning and cultural engagement across departments, overseeing event planning and member coordination.",
      details: "As President, I organize cross-departmental events, manage a team of 50+ members, and create opportunities for students to explore diverse fields beyond their majors.",
      impact: "Enhanced campus culture, fostered interdisciplinary collaboration, developed leadership skills",
      skills: ["Leadership", "Event Planning", "Team Management", "Communication"],
      icon: Users,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      id: 4,
      title: "Tech Lead at SkillSync",
      category: "Professional",
      year: "2025 - Present",
      location: "Remote",
      description: "Leading AI development initiatives, building recommendation models, web scrapers, and CV analyzers for personalized student opportunities.",
      details: "As Tech Lead, I architect AI solutions, mentor junior developers, and ensure the technical excellence of our platform that serves 1000+ students.",
      impact: "Improved student experience, developed scalable AI solutions, mentored team members",
      skills: ["AI/ML", "Leadership", "System Architecture", "Mentoring"],
      icon: Code,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      id: 5,
      title: "Hackverse Core Team",
      category: "Event Management",
      year: "2024",
      location: "IILM University",
      description: "Collaborated with faculty and sponsors to structure and manage Hackverse hackathon, handling logistics and participant mentorship.",
      details: "Managed a hackathon with 200+ participants, coordinated with sponsors, handled logistics, and provided technical mentorship to participants.",
      impact: "Successful hackathon execution, participant satisfaction, strengthened industry connections",
      skills: ["Event Management", "Logistics", "Mentoring", "Sponsor Relations"],
      icon: Zap,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30"
    },
    {
      id: 6,
      title: "Social Media Head - Aisynctech",
      category: "Marketing",
      year: "2024 - Present",
      location: "Remote",
      description: "Managed social media strategy and content creation for Aisynctech, enhancing online presence and community engagement.",
      details: "Developed and executed social media strategies, created engaging content, and managed community interactions to boost brand visibility and engagement.",
      impact: "Increased brand awareness, improved community engagement, developed marketing skills",
      skills: ["Social Media", "Content Creation", "Marketing Strategy", "Community Management"],
      icon: Star,
      color: "from-pink-500 to-purple-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Achievements', icon: Award },
    { id: 'Competition', label: 'Competitions', icon: Trophy },
    { id: 'Writing', label: 'Writing', icon: BookOpen },
    { id: 'Leadership', label: 'Leadership', icon: Users },
    { id: 'Professional', label: 'Professional', icon: Code },
    { id: 'Event Management', label: 'Events', icon: Zap },
    { id: 'Marketing', label: 'Marketing', icon: Star }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const getCategoryStats = () => {
    const stats = categories.slice(1).map(category => ({
      ...category,
      count: achievements.filter(a => a.category === category.id).length
    }));
    return stats;
  };

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-yellow-400 text-sm font-semibold tracking-wide uppercase">Achievements</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            MY <span className="italic text-orange-400">ACHIEVEMENTS</span> & MILESTONES
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Explore my journey of accomplishments across competitions, leadership, 
            professional work, and creative endeavors. Each achievement tells a story of growth and impact.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {getCategoryStats().map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                className="text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSelectedCategory(stat.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.count}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black' 
                    : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-slate-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
                {category.label}
              </motion.button>
            );
          })}
        </div>

        {/* Achievements Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAchievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  className={`p-8 rounded-xl border transition-all duration-300 cursor-pointer ${achievement.bgColor} ${achievement.borderColor} border hover:border-opacity-50`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setSelectedAchievement(achievement.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{achievement.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {achievement.year}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {achievement.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {achievement.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-gray-400 font-semibold">Key Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {achievement.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-slate-700 text-xs text-cyan-400 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-600">
                    <span className="text-xs text-gray-400">Click to learn more</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Achievement Detail Modal */}
        <AnimatePresence>
          {selectedAchievement !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedAchievement(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 rounded-xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const achievement = achievements.find(a => a.id === selectedAchievement);
                  if (!achievement) return null;
                  
                  const Icon = achievement.icon;
                  
                  return (
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">{achievement.title}</h2>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {achievement.year}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {achievement.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-cyan-400 mb-2">Description</h3>
                          <p className="text-gray-300 leading-relaxed">{achievement.description}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-purple-400 mb-2">Details</h3>
                          <p className="text-gray-300 leading-relaxed">{achievement.details}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-green-400 mb-2">Impact</h3>
                          <p className="text-gray-300 leading-relaxed">{achievement.impact}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-orange-400 mb-3">Skills Developed</h3>
                          <div className="flex flex-wrap gap-2">
                            {achievement.skills.map((skill, index) => (
                              <span key={index} className="px-3 py-1 bg-slate-800 text-cyan-400 text-sm rounded-full border border-cyan-500/30">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-700">
                        <button
                          onClick={() => setSelectedAchievement(null)}
                          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-black font-semibold py-3 rounded-lg transition-all duration-300"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AchievementsGallery;
