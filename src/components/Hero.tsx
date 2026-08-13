import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal, Linkedin, Github, Mail, Instagram, Youtube } from 'lucide-react';
import { TerminalWindow } from './hero/TerminalWindow';
import { LiveNotificationBar } from './hero/LiveNotificationBar';

const Hero = () => {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <div className="relative min-h-[88vh] w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-16 overflow-hidden">
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto mt-8 sm:mt-12 lg:mt-14"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Primary Information Area */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left">
            
            {/* Profile Photo & Identity */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              {/* Clean Profile Avatar */}
              <div className="relative">
                <div className="relative rounded-xl p-[2px] bg-neutral-950 border border-white/20 shadow-xl overflow-hidden">
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-white/10">
                    <AvatarImage
                      src="https://i.postimg.cc/L5fTYp4s/Whats-App-Image-2026-08-03-at-15-25-30.png"
                      alt="Devansh Datta"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-neutral-900 text-white rounded-lg font-mono">
                      DD
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              {/* Name & Eyebrow Identity */}
              <div className="space-y-1">
                <div className="text-white font-bold text-lg sm:text-xl tracking-tight flex items-center gap-2">
                  <span>Devansh Datta</span>
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded border border-sky-500/30 bg-sky-950/30 text-sky-400 font-mono text-xs font-semibold tracking-wider uppercase">
                  <Terminal className="w-3 h-3 text-sky-400" />
                  AI/ML ENGINEER · SYSTEM BUILDER
                </div>
              </div>
            </motion.div>

            {/* Level 1 Headline & Meme Sub-headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight">
                IDEA OR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                  IMPLEMENTATION?
                </span>
              </h1>
              
              <p className="text-sm sm:text-base text-neutral-400 font-mono font-medium tracking-tight">
                Idea. Implementation follows. 😭
              </p>
            </motion.div>

            {/* Supporting Descriptor (Compact) */}
            <motion.div variants={itemVariants}>
              <span className="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-200 font-mono text-xs sm:text-sm font-semibold tracking-wide">
                AI/ML · Systems · Products
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                size="lg"
                className="bg-white hover:bg-neutral-200 text-black font-bold px-7 h-12 rounded-xl gap-2 shadow-lg shadow-white/10 transition-all hover:scale-[1.02]"
                onClick={scrollToProjects}
              >
                <span>VIEW MY WORK</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <a
                href="https://drive.google.com/file/d/1oeo99hbJs8h4zf3jFABcLuW8LuSLBu6_/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-neutral-900/60 hover:bg-white hover:text-black text-white font-medium px-6 h-12 rounded-xl gap-2 backdrop-blur-sm transition-all"
                >
                  <span>RESUME</span>
                  <Download className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>

            {/* Proof Badges */}
            <motion.div variants={itemVariants} className="pt-1">
              <div className="flex flex-wrap gap-2">
                {[
                  '🏆 3rd — National Patent Conclave',
                  '📖 Published Author',
                  '🚀 Founder — Tatvam',
                  '🎓 B.Tech CSE (AI/ML)',
                ].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 text-xs font-mono rounded-lg border border-white/15 text-neutral-300 bg-neutral-900/70 backdrop-blur-md shadow-sm hover:border-sky-500/40 hover:text-white transition-colors"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Restored Social Buttons Row */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 pt-1">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/devansh-datta06', label: 'LinkedIn' },
                { icon: Github, href: 'https://github.com/Devansh5150', label: 'GitHub' },
                { icon: Mail, href: 'mailto:work.devansh.datta@gmail.com', label: 'Email' },
                { icon: Instagram, href: 'https://www.instagram.com/devansh.datta/', label: 'Instagram' },
                { icon: Youtube, href: 'https://www.youtube.com/@devanshdatta', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 text-neutral-400 hover:text-white hover:bg-white/10 hover:border-sky-500/40 transition-all hover:-translate-y-0.5"
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>

            {/* Live Personal Notification Bar */}
            <motion.div variants={itemVariants} className="pt-2">
              <LiveNotificationBar />
            </motion.div>

          </div>

          {/* Right Column: Unified Gridded Command Center */}
          <div className="lg:col-span-6 xl:col-span-6 mt-4 lg:mt-0 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Primary Terminal: WHOAMI + TIMELINE (Spans Full Width of Command Center) */}
              <div className="sm:col-span-2">
                <TerminalWindow title="devansh@portfolio:~" statusBadge="ACTIVE">
                  <div className="space-y-4 font-mono text-xs">
                    {/* WHOAMI Section */}
                    <div>
                      <div className="flex items-center gap-2 text-sky-400 font-semibold mb-1.5">
                        <span className="text-sky-400">$</span>
                        <span>whoami</span>
                        <span className="w-1.5 h-3.5 bg-sky-400 inline-block animate-pulse ml-0.5" />
                      </div>
                      <div className="pl-3 space-y-0.5">
                        <p className="text-white font-bold text-sm">Devansh Datta</p>
                        <p className="text-neutral-300 font-medium">AI/ML Engineer · System Builder</p>
                        <div className="pt-1 flex items-center gap-1.5 text-neutral-400 text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                          <span>status: building...</span>
                        </div>
                      </div>
                    </div>

                    {/* TIMELINE Section */}
                    <div className="pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                        <span className="text-sky-400">$</span>
                        <span>timeline</span>
                      </div>
                      <div className="pl-3 space-y-2 text-[11px]">
                        <div className="flex items-start gap-4">
                          <span className="text-neutral-400 font-bold w-10">2026</span>
                          <div>
                            <span className="text-white font-medium block">Founder</span>
                            <span className="text-neutral-400 text-[10px]">Tatvam</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <span className="text-neutral-400 font-bold w-10">2026</span>
                          <div>
                            <span className="text-sky-300 font-medium block">Tech Lead</span>
                            <span className="text-neutral-400 text-[10px]">SkillSync</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <span className="text-neutral-400 font-bold w-10">2025</span>
                          <div>
                            <span className="text-neutral-300 font-medium block">Founder · TORQ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TerminalWindow>
              </div>

              {/* Projects Terminal */}
              <div className="sm:col-span-1">
                <TerminalWindow title="devansh@portfolio:~" className="h-full">
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center gap-2 text-sky-400 font-semibold">
                      <span className="text-sky-400">$</span>
                      <span>projects --status</span>
                    </div>

                    <div className="space-y-2 pl-1">
                      {[
                        { name: 'Tatvam', isLive: true },
                        { name: 'NED', isLive: true },
                        { name: 'SkillSync', isLive: true },
                        { name: 'TORQ', isLive: false },
                      ].map((p) => (
                        <div key={p.name} className="flex justify-between items-center text-[11px]">
                          <span className="text-white font-bold tracking-wide">{p.name}</span>
                          {p.isLive ? (
                            <span className="text-[10px] text-sky-400 font-medium flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                              LIVE
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              BUILDING
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </TerminalWindow>
              </div>

              {/* Skills & Education Terminal */}
              <div className="sm:col-span-1">
                <TerminalWindow title="devansh@portfolio:~" className="h-full">
                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                        <span className="text-sky-400">$</span>
                        <span>skills --core</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          'Python',
                          'ML / AI',
                          'System Design',
                          'SQL',
                          'React',
                          'FastAPI',
                          'Docker',
                          'Git',
                          'Next.js',
                          'Azure',
                          'LLMs',
                          'Supabase',
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 bg-neutral-900/80 text-neutral-300 rounded border border-white/10 text-[10px]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 space-y-1">
                      <div className="flex items-center gap-2 text-sky-400 font-semibold">
                        <span className="text-sky-400">$</span>
                        <span>education</span>
                      </div>
                      <div className="pl-2 text-[11px]">
                        <p className="text-white font-semibold">B.Tech CSE (AI/ML)</p>
                        <p className="text-neutral-400 text-[10px]">IILM University · Gurugram</p>
                      </div>
                    </div>
                  </div>
                </TerminalWindow>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Hero;




