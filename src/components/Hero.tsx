
import { ArrowDown, Code, Terminal, Zap, Brain, Cpu } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const handleAchievementsClick = () => {
    navigate('/achievements');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-40 right-40 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-40 left-40 w-56 h-56 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-300"></div>
      </div>
      
      {/* Matrix-style background lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent left-1/4 animate-pulse"></div>
        <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent right-1/4 animate-pulse delay-500"></div>
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent top-1/3 animate-pulse delay-300"></div>
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-teal-400 to-transparent bottom-1/3 animate-pulse delay-700"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/40 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-teal-400/40 rounded-full animate-bounce delay-700"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto my-[101px] animate-fade-in">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            {/* Enhanced Profile Image with glow effect */}
            <div className="relative mb-8 mx-auto lg:mx-0 w-36 h-36 rounded-full bg-gradient-to-r from-blue-400 to-teal-500 p-1 animate-scale-in hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full blur-md opacity-50 animate-pulse"></div>
              <Avatar className="w-full h-full relative z-10">
                <AvatarImage src="https://i.postimg.cc/prctTy04/10aab1b0-d493-47cd-b02d-d5533b986e5d.png" alt="Devansh Datta" className="object-cover" />
                <AvatarFallback className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-4xl font-bold text-blue-400">
                  DD
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 animate-pulse shadow-lg shadow-green-500/50"></div>
            </div>
            
            <div className="mb-6 animate-slide-up delay-200">
              <span className="inline-block px-6 py-2.5 bg-blue-500/20 text-blue-400 rounded-full font-medium mb-4 text-3xl hover:bg-blue-500/30 transition-all duration-300 transform hover:scale-105">
                👋 Hi, I'm Devansh Datta
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-clip-text text-transparent animate-slide-up delay-300 hover:from-purple-400 hover:via-cyan-400 hover:to-purple-400 transition-all duration-500">
              AI DEVELOPER
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl italic">& CREATIVE WRITER</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-slide-up delay-500">
              Passionate AI developer, tech enthusiast, and creative writer pursuing B.Tech in CSE at IILM University. 
              Transforming ideas into innovative solutions through AI/ML, web development, and poetic expression.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-slide-up delay-700">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-black font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25" 
                onClick={() => window.open('mailto:work.devansh.datta@gmail.com')}
              >
                Get In Touch
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-black px-8 py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25" 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
            </div>
          </div>

          {/* Right Side - Tech Dashboard */}
          <div className="flex flex-col items-center lg:items-end animate-slide-up delay-1000">
            <div className="relative w-80 h-80 bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-2 text-gray-400 text-sm font-mono">~/devansh-portfolio</div>
              </div>
              
              {/* Tech Stack Icons */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors cursor-pointer group">
                  <Brain className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <span className="text-xs text-gray-400 mt-1">AI/ML</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-green-500/10 rounded-lg hover:bg-green-500/20 transition-colors cursor-pointer group">
                  <Code className="w-8 h-8 text-green-400 group-hover:text-green-300 transition-colors" />
                  <span className="text-xs text-gray-400 mt-1">Code</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-colors cursor-pointer group">
                  <Cpu className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <span className="text-xs text-gray-400 mt-1">Systems</span>
                </div>
              </div>
              
              {/* Code snippet animation */}
              <div className="bg-black/30 rounded p-3 font-mono text-sm">
                <div className="text-green-400 mb-1">$ npm run dev</div>
                <div className="text-gray-400 mb-1">Starting development server...</div>
                <div className="text-cyan-400 mb-1">✓ Local: http://localhost:3000</div>
                <div className="text-blue-400 flex items-center">
                  <Terminal className="w-4 h-4 mr-1" />
                  Ready in 1.2s
                </div>
              </div>
              
              {/* Achievement button */}
              <button 
                onClick={handleAchievementsClick}
                className="mt-4 w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-3 text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Zap className="w-4 h-4 group-hover:text-cyan-300 transition-colors" />
                View Achievements
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats with animations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto animate-slide-up delay-1200">
          <div className="text-center p-4 rounded-lg bg-slate-800/20 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:bg-slate-800/30">
            <div className="text-2xl md:text-3xl font-bold text-blue-400 animate-pulse">4+</div>
            <div className="text-sm text-gray-400">Active Projects</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-800/20 backdrop-blur-sm border border-teal-500/20 hover:border-teal-500/50 transition-all duration-300 transform hover:scale-105 hover:bg-slate-800/30">
            <div className="text-2xl md:text-3xl font-bold text-teal-400 animate-pulse delay-200">2+</div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-800/20 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:bg-slate-800/30">
            <div className="text-2xl md:text-3xl font-bold text-blue-400 animate-pulse delay-400">AI/ML</div>
            <div className="text-sm text-gray-400">Specialization</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-800/20 backdrop-blur-sm border border-green-500/20 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 hover:bg-slate-800/30">
            <div className="text-2xl md:text-3xl font-bold text-green-400 animate-pulse delay-600">Poetry</div>
            <div className="text-sm text-gray-400">Creative Outlet</div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <button 
        onClick={scrollToAbout} 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-blue-400 animate-bounce cursor-pointer hover:text-blue-300 transition-colors group"
      >
        <div className="relative">
          <ArrowDown size={32} className="group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </button>
    </div>
  );
};

export default Hero;
