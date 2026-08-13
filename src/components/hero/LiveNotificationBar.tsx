import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const MESSAGES = [
  '✦ Currently building NED — my personal AI operating system.',
  '🚀 Building ideas into real products — currently exploring AI systems.',
  '🧠 AI/ML engineer focused on systems, agents and intelligent products.',
  '🏆 3rd — National Patent Conclave.',
  '📖 Published author · B.Tech CSE (AI/ML).',
  '⚡ I like building things that probably shouldn\'t work. 😭',
];

export const LiveNotificationBar: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % MESSAGES.length);
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl shadow-lg hover:border-sky-500/30 hover:bg-neutral-900/90 transition-all duration-300 max-w-full font-mono text-xs select-none"
      role="status"
      aria-live="polite"
    >
      {/* Live status badge with cool blue accent */}
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-950/50 border border-sky-500/20 text-sky-400 font-semibold text-[10px] shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        <span>LIVE</span>
      </div>

      {/* Rotating Message Container */}
      <div className="relative overflow-hidden h-5 flex items-center min-w-0 flex-1 text-neutral-200">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="truncate font-mono text-[11px] sm:text-xs text-neutral-200 tracking-tight"
          >
            {MESSAGES[index].startsWith('✦') ? (
              <>
                <span className="text-sky-400 font-bold mr-1">✦</span>
                {MESSAGES[index].slice(1).trim()}
              </>
            ) : (
              MESSAGES[index]
            )}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveNotificationBar;
