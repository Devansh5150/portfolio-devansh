
import { ArrowDown, Code, Terminal, Zap, Brain, Cpu } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto my-[101px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div 
            className="text-center lg:text-left"
            variants={itemVariants}
          >
            {/* Enhanced Profile Image with glow effect */}
            <motion.div 
              className="relative mb-8 mx-auto lg:mx-0 w-36 h-36 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 p-1"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full blur-md opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Avatar className="w-full h-full relative z-10">
                <AvatarImage src="https://i.postimg.cc/prctTy04/10aab1b0-d493-47cd-b02d-d5533b986e5d.png" alt="Devansh Datta" className="object-cover" />
                <AvatarFallback className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-4xl font-bold text-blue-400">
                  DD
                </AvatarFallback>
              </Avatar>
              <motion.div 
                className="absolute -top-2 -right-2 w-8 h-8 bg-fuchsia-500 rounded-full border-4 border-slate-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <motion.span 
                className="inline-block px-6 py-2.5 bg-fuchsia-500/20 text-fuchsia-400 rounded-full font-medium mb-4 text-3xl"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                👋 Hi, I'm Devansh Datta
              </motion.span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              AI DEVELOPER
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl italic">& CREATIVE WRITER</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              variants={itemVariants}
            >
              Passionate AI developer, tech enthusiast, and creative writer pursuing B.Tech in CSE at IILM University. 
              Transforming ideas into innovative solutions through AI/ML, web development, and poetic expression.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-600 hover:to-cyan-600 text-black font-semibold px-8 py-3 transition-all duration-300" onClick={() => window.open('mailto:work.devansh.datta@gmail.com')}>
                  Get In Touch
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-black px-8 py-3 transition-all duration-300" onClick={() => document.getElementById('projects')?.scrollIntoView({
                behavior: 'smooth'
              })}>
                  View Projects
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Coding Animation Dashboard */}
          <motion.div 
            className="flex flex-col items-center lg:items-end my-[72px] rounded-lg py-[36px]"
            variants={itemVariants}
          >
            <motion.div 
              className="relative w-80 h-80 bg-slate-900/50 backdrop-blur-sm border border-fuchsia-500/30 rounded-lg p-6 overflow-hidden"
              whileHover={{ scale: 1.02, borderColor: "rgba(217, 70, 239, 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-2 text-gray-400 text-sm font-mono">~/coding-session</div>
              </div>
              
              {/* Coding Person Animation */}
              <motion.div 
                className="flex items-center justify-center mb-4"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
              >
                <div className="relative">
                  {/* Person silhouette */}
                  <div className="w-12 h-12 bg-gradient-to-b from-fuchsia-400 to-cyan-400 rounded-full relative">
                    {/* Eyes */}
                    <motion.div 
                      className="absolute top-3 left-2 w-1.5 h-1.5 bg-white rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute top-3 right-2 w-1.5 h-1.5 bg-white rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    />
                  </div>
                  {/* Body */}
                  <div className="w-8 h-16 bg-gradient-to-b from-fuchsia-400 to-cyan-400 mx-auto relative">
                    {/* Arms typing */}
                    <motion.div 
                      className="absolute -left-2 top-2 w-6 h-1 bg-blue-400 rounded"
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div 
                      className="absolute -right-2 top-2 w-6 h-1 bg-blue-400 rounded"
                      animate={{ rotate: [10, -10, 10] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.1 }}
                    />
                  </div>
                  {/* Typing indicator */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-1 bg-cyan-400 rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Tech Stack Icons */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { icon: Brain, label: 'AI/ML', color: 'blue' },
                  { icon: Code, label: 'Code', color: 'green' },
                  { icon: Cpu, label: 'Systems', color: 'purple' }
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center p-2 bg-fuchsia-500/10 rounded-lg cursor-pointer group"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(217, 70, 239, 0.2)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <tech.icon className="w-6 h-6 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" />
                    <span className="text-xs text-gray-400 mt-1">{tech.label}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Enhanced Live coding animation with dynamic typing */}
              <div className="bg-black/40 rounded p-3 font-mono text-xs space-y-1 border border-fuchsia-400/20">
                <div className="text-fuchsia-400 flex items-center">
                  <span className="animate-pulse mr-1 text-fuchsia-300">$</span> 
                  <span className="relative">
                    Building the future
                    <span className="animate-pulse">|</span>
                  </span>
                </div>
                <div className="text-cyan-300 opacity-80 transition-opacity duration-300 hover:opacity-100">
                  <span className="animate-pulse delay-500 text-cyan-200">▶</span> React + AI/ML + Poetry
                </div>
                <div className="text-cyan-400 flex items-center opacity-60 transition-opacity duration-300 hover:opacity-100">
                  <Terminal className="w-3 h-3 mr-1 animate-pulse delay-1000" />
                  <span className="animate-pulse delay-700">Status: 
                    <span className="text-cyan-300 ml-1 font-semibold">Active</span>
                  </span>
                </div>
                <div className="text-fuchsia-400 text-right animate-pulse delay-1000 transition-all duration-300 hover:text-fuchsia-300">
                  <Zap className="w-3 h-3 inline mr-1 animate-bounce" />
                  Innovation Mode: 
                  <span className="text-cyan-300 ml-1 font-bold">ON</span>
                </div>
                <div className="text-cyan-200 opacity-70 animate-pulse delay-1500">
                  <span className="mr-1">⚡</span>
                  Lines coded: <span className="text-cyan-300 font-mono">∞</span>
                </div>
                <div className="text-fuchsia-300 opacity-50 text-right animate-pulse delay-2000">
                  <span className="mr-1">🚀</span>
                  Dreams → Reality
                </div>
              </div>
              {/* Live coding animation */}
              <div className="bg-black/30 rounded p-3 font-mono text-xs space-y-1">
                <motion.div 
                  className="text-green-400 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.span 
                    className="mr-1"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    $
                  </motion.span> 
                  <span>Building the future...</span>
                </motion.div>
                <motion.div 
                  className="text-cyan-400 opacity-80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 1.5 }}
                >
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                  >
                    ▶
                  </motion.span> React + AI/ML + Poetry
                </motion.div>
                <motion.div 
                  className="text-blue-400 flex items-center opacity-60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 2 }}
                >
                  <Terminal className="w-3 h-3 mr-1" />
                  <span>Status: Coding...</span>
                </motion.div>
                <motion.div 
                  className="text-purple-400 text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  <Zap className="w-3 h-3 inline mr-1" />
                  Innovation Mode: ON
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Stats with animations */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto"
          variants={containerVariants}
        >
          {[
            { value: '4+', label: 'Active Projects', color: 'blue' },
            { value: '2+', label: 'Years Experience', color: 'teal' },
            { value: 'AI/ML', label: 'Specialization', color: 'blue' },
            { value: 'Poetry', label: 'Creative Outlet', color: 'green' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 rounded-lg bg-slate-800/20 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.3)" }}
            >
              <motion.div 
                className="text-2xl md:text-3xl font-bold text-blue-400"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Enhanced Scroll Indicator */}
      <motion.button 
        onClick={scrollToAbout} 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-fuchsia-400 cursor-pointer group"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="relative">
          <ArrowDown size={32} className="group-hover:scale-110 transition-transform duration-300" />
          <motion.div 
            className="absolute inset-0 bg-fuchsia-400/20 rounded-full blur-lg"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.button>
    </div>
  );
};

export default Hero;
