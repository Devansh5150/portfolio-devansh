import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

const lines = [
  "INITIALIZING...",
  "LOADING MEMORY ARCHIVE...",
  "SYNCING THOUGHTS...",
  "IDENTITY DETECTED."
];

export const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 800); // Time between lines
      return () => clearTimeout(timer);
    } else if (currentLine === lines.length) {
      // Pause before pulse
      const pauseTimer = setTimeout(() => {
        setShowPulse(true);
      }, 1000);
      return () => clearTimeout(pauseTimer);
    }
  }, [currentLine]);

  useEffect(() => {
    if (showPulse) {
      // After pulse completes, trigger next phase
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showPulse, onComplete]);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black overflow-hidden font-mono text-cyan-400/80 tracking-widest text-sm md:text-base">
      <AnimatePresence>
        {!showPulse && (
          <motion.div
            className="flex flex-col items-start gap-2"
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            {lines.slice(0, currentLine).map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {line}
              </motion.div>
            ))}
            {currentLine < lines.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPulse && (
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-cyan-400"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 100, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
