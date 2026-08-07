import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, Youtube, Globe } from 'lucide-react';
import { SplineScene } from './ui/splite';
import { useNavigate } from 'react-router-dom';
import { Spotlight } from './ui/spotlight';

const Hero = () => {
  const navigate = useNavigate();
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const itemVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center px-6 overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* Background Spline Robot */}
      <div className="absolute inset-0 z-0">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto text-left mt-16 md:mt-24 lg:mt-28 pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-6 pointer-events-auto" variants={itemVariants}>
          <div className="relative inline-block mb-4">
            {/* Rotating Diamond Glow Backdrop */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-32 h-32 md:w-36 md:h-36 bg-white/10 rounded-3xl rotate-45 border border-white/20 backdrop-blur-sm"
                animate={{ rotate: [45, 225, 405] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Inner border and avatar */}
            <div className="relative rounded-2xl p-[3px] bg-black/80 border border-white/20 shadow-2xl z-10 overflow-hidden">
              <Avatar className="w-28 h-28 lg:w-32 lg:h-32 rounded-xl border border-white/10">
                <AvatarImage src="https://i.postimg.cc/L5fTYp4s/Whats-App-Image-2026-08-03-at-15-25-30.png" alt="Devansh Datta" className="object-cover" />
                <AvatarFallback className="bg-neutral-900 text-white rounded-xl">DD</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="text-base md:text-lg text-gray-300 uppercase tracking-wide font-semibold">AI Developer & System Architect</div>
        </motion.div>

        <div className="w-full grid lg:grid-cols-2 gap-10 items-center">
          <div className="pointer-events-auto">
            <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight" variants={itemVariants}>
              I build AI systems<br className="hidden md:block" /> that{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-500">ship.</span>
            </motion.h1>
            <motion.p className="text-gray-300 max-w-2xl mb-6 text-lg md:text-xl leading-relaxed" variants={itemVariants}>
              From emotion-aware music players to emergency vehicle platforms - I take AI products from zero to production.
              Currently Tech Lead at SkillSync, building recommendation engines that serve 1,000+ students.
            </motion.p>

            {/* Credibility badges */}
            <motion.div className="flex flex-wrap gap-2 mb-8" variants={itemVariants}>
              {[
                '🏆 3rd - National Patent Conclave',
                '📚 Published Author',
                '🚀 CEO, Torq (Startup)',
                '🎓 B.Tech CSE (AIML)'
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 text-xs rounded-full border border-white/20 text-gray-300 bg-white/5"
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4" variants={itemVariants}>
              <Button
                size="lg"
                className="bg-white hover:bg-neutral-200 text-black font-semibold px-8 h-12"
                onClick={() => window.open('mailto:work.devansh.datta@gmail.com')}
              >
                Get in Touch
              </Button>
              <Button
                size="lg"
                className="bg-white/10 hover:bg-white text-white hover:text-black border border-white/30 font-semibold px-8 h-12 gap-2 backdrop-blur-sm transition-all"
                onClick={() => navigate('/world')}
              >
                <Globe className="w-5 h-5" />
                Explore My World
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-black px-8 h-12"
                onClick={scrollToProjects}
              >
                View Projects
              </Button>
            </motion.div>

            {/* Social buttons row */}
            <motion.div className="mt-8 flex flex-wrap items-center gap-3" variants={itemVariants}>
              <a
                href="https://www.linkedin.com/in/devansh-datta06"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Devansh5150"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:work.devansh.datta@gmail.com"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/devansh.datta/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@devanshdatta"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Empty space for robot to shine through on desktop */}
          <div className="hidden lg:block h-[500px]" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
