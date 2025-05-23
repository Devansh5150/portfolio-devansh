import { ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto my-[101px]">
        {/* Profile Image */}
        <div className="relative mb-8 mx-auto w-36 h-36 rounded-full bg-gradient-to-r from-blue-400 to-teal-500 p-1">
          <Avatar className="w-full h-full">
            <AvatarImage src="https://i.postimg.cc/prctTy04/10aab1b0-d493-47cd-b02d-d5533b986e5d.png" alt="Devansh Datta" className="object-cover" />
            <AvatarFallback className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-4xl font-bold text-blue-400">
              DD
            </AvatarFallback>
          </Avatar>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 animate-pulse"></div>
        </div>
        
        <div className="mb-6">
          <span className="inline-block px-6 py-2.5 bg-blue-500/20 text-blue-400 rounded-full font-medium mb-4 text-3xl">
            👋 Hi, I'm Devansh Datta
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
          AI DEVELOPER
          <br />
          <span className="text-4xl md:text-6xl lg:text-7xl italic">& CREATIVE WRITER</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Passionate AI developer, tech enthusiast, and creative writer pursuing B.Tech in CSE at IILM University. 
          Transforming ideas into innovative solutions through AI/ML, web development, and poetic expression.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-black font-semibold px-8 py-3 transition-all duration-300 transform hover:scale-105" onClick={() => window.open('mailto:work.devansh.datta@gmail.com')}>
            Get In Touch
          </Button>
          <Button variant="outline" size="lg" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-black px-8 py-3 transition-all duration-300 transform hover:scale-105" onClick={() => document.getElementById('projects')?.scrollIntoView({
          behavior: 'smooth'
        })}>
            View Projects
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-400">4+</div>
            <div className="text-sm text-gray-400">Active Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-teal-400">2+</div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-400">AI/ML</div>
            <div className="text-sm text-gray-400">Specialization</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-400">Poetry</div>
            <div className="text-sm text-gray-400">Creative Outlet</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button onClick={scrollToAbout} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-blue-400 animate-bounce cursor-pointer hover:text-blue-300 transition-colors">
        <ArrowDown size={32} />
      </button>
    </div>;
};
export default Hero;