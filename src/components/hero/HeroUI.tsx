import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeroUI = () => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="text-center mb-4">
        <h2 className="text-sm md:text-base tracking-[0.3em] text-cyan-400 font-medium uppercase mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
          The Mind Of
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-4">
          DEVANSH<br />DATTA
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base lg:text-lg mb-8 font-light leading-relaxed">
          AI Engineer • Product Builder • Founder<br/><br/>
          <span className="text-gray-400 italic">Exploring the intersection of Artificial Intelligence, Human Potential, and Timeless Wisdom.</span>
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
        <Button 
          onClick={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="relative overflow-hidden group bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm h-12 px-8 font-medium tracking-wide transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            ACCESS MIND ARCHIVE
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
          {/* Subtle hover glow inside button */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
        </Button>

        <Button 
          onClick={() => navigate('/world')}
          variant="outline"
          className="group bg-transparent hover:bg-white/5 border-white/10 text-white h-12 px-8 font-medium tracking-wide backdrop-blur-sm transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            WATCH INTRO
            <Play className="w-4 h-4 text-white/70 group-hover:text-white fill-transparent group-hover:fill-white/20 transition-all" />
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
};
