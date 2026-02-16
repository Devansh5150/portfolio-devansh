import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, Youtube } from 'lucide-react';
import { SplineScene } from './ui/splite';
import { Spotlight } from './ui/spotlight';

const Hero = () => {
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
            {/* Rotating gradient ring */}
            <motion.div
              aria-hidden
              className="absolute -inset-1 rounded-2xl"
              style={{
                background:
                  'conic-gradient(from 0deg, rgba(255,255,255,0.35), rgba(255,255,255,0.05), rgba(255,255,255,0.35))'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
            {/* Inner border and glow */}
            <div className="relative rounded-2xl p-[3px] bg-white/10">
              <div className="absolute inset-0 rounded-2xl blur-lg bg-white/10" aria-hidden />
              <Avatar className="w-28 h-28 lg:w-32 lg:h-32 rounded-xl border border-white/15">
                <AvatarImage src="https://i.postimg.cc/prctTy04/10aab1b0-d493-47cd-b02d-d5533b986e5d.png" alt="Devansh Datta" />
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
              From emotion-aware music players to emergency vehicle platforms — I take AI products from zero to production.
              Currently Tech Lead at SkillSync, building recommendation engines that serve 1,000+ students.
            </motion.p>

            {/* Credibility badges */}
            <motion.div className="flex flex-wrap gap-2 mb-8" variants={itemVariants}>
              {[
                '🏆 3rd — National Patent Conclave',
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
