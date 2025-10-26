import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, Phone, Youtube } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  const itemVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

  // Typing animation for terminal
  const fullCommand = "print('Hello and welcome to Devansh world')";
  const [typed, setTyped] = useState('');
  const [doneTyping, setDoneTyping] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const termRef = useRef<HTMLDivElement | null>(null);
  const outputContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  } as const;
  const lineVariants = { hidden: { opacity: 0, y: 4 }, visible: { opacity: 1, y: 0 } } as const;

  const startTyping = () => {
    // reset and (re)start typing
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    setTyped('');
    setDoneTyping(false);
    let i = 0;
    intervalRef.current = window.setInterval(() => {
      i += 1;
      setTyped(fullCommand.slice(0, i));
      if (i >= fullCommand.length) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDoneTyping(true);
      }
    }, 35);
  };

  useEffect(() => {
    startTyping();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  // Restart typing when terminal enters viewport
  useEffect(() => {
    if (!termRef.current) return;
    const el = termRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            startTyping();
          }
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-6">
      

      {/* Social icons (top-right quick access) */}
      <div className="absolute top-6 right-6 hidden sm:flex items-center gap-5 text-gray-300">
        <a href="https://github.com/Devansh5150" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="GitHub">
          <Github className="w-5 h-5" />
        </a>
        <a href="https://www.linkedin.com/in/devansh-datta06" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="LinkedIn">
          <Linkedin className="w-5 h-5" />
        </a>
        <a href="https://www.instagram.com/devansh.datta/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="https://www.youtube.com/@devanshdatta" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
          <Youtube className="w-5 h-5" />
        </a>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto text-left mt-16 md:mt-24 lg:mt-28"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-6" variants={itemVariants}>
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
          <div className="text-base md:text-lg text-gray-300">B.Tech CSE | AI Developer</div>
        </motion.div>

        <div className="w-full grid lg:grid-cols-2 gap-10 items-start">
          <div>
        <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2" variants={itemVariants}>
          Hi, I'm Devansh
        </motion.h1>
        <motion.p className="text-gray-300 max-w-3xl mb-8 text-lg md:text-xl" variants={itemVariants}>
          I’m a Computer Science student and AI developer passionate about building systems where logic meets emotion.
          <br className="hidden md:block" />
          From emotion-based music recommenders to smart logistics and face recognition tools, I craft AI-driven experiences that connect and inspire.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row items-center gap-4" variants={itemVariants}>
          <Button size="lg" className="bg-white hover:bg-neutral-200 text-black font-semibold px-8" onClick={() => window.open('mailto:work.devansh.datta@gmail.com')}>
            Get in touch
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black px-8"
            onClick={scrollToAbout}
          >
            Learn more
          </Button>
        </motion.div>
        
        {/* Social buttons row */}
        <motion.div className="mt-6 flex flex-wrap items-center gap-3" variants={itemVariants}>
          <a
            href="https://www.linkedin.com/in/devansh-datta06"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/Devansh5150"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-colors"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:work.devansh.datta@gmail.com"
            aria-label="Email"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-colors"
            title="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/devansh.datta/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-colors"
            title="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.youtube.com/@devanshdatta"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-colors"
            title="YouTube"
          >
            <Youtube className="w-5 h-5" />
          </a>
          <a
            href="tel:9871993246"
            aria-label="Phone"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-colors"
            title="Phone"
          >
            <Phone className="w-5 h-5" />
          </a>
        </motion.div>
          </div>
          {/* Right side: square terminal */}
          <motion.div className="hidden lg:block justify-self-end" variants={itemVariants}>
            <div ref={termRef} onMouseEnter={startTyping} className="w-80 h-80 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-gray-400 font-mono select-none">python3</span>
              </div>
              <div className="p-4 font-mono text-sm leading-6">
                <div className="text-gray-300">
                  <span className="text-green-400">{'>'}{'>'}{'>'} </span>
                  <span className="whitespace-pre-wrap">
                    {typed}
                    {!doneTyping && <span className="opacity-70 animate-pulse">|</span>}
                  </span>
                </div>
                {doneTyping && (
                  <motion.div
                    className="mt-2 space-y-1"
                    variants={outputContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={lineVariants} className="text-green-400">Hello and welcome to Devansh world</motion.div>
                    <motion.div variants={lineVariants} className="text-green-300">Glad you're here — make yourself at home.</motion.div>
                    <motion.div variants={lineVariants} className="text-green-300">Explore projects, read about my work, and say hi anytime.</motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
