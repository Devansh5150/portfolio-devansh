import { motion } from 'framer-motion';

export const Silhouette = () => {
  return (
    <div className="relative flex items-center justify-center w-full min-h-[420px] overflow-hidden bg-black text-white py-12">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(120, 120, 120, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(120, 120, 120, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
        aria-hidden="true"
      />

      {/* Radial Glowing Orb Container */}
      <motion.div
        className="relative z-10 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.12)] backdrop-blur-sm overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.15) 0%, rgba(30, 30, 30, 0.8) 60%, rgba(10, 10, 10, 0.95) 100%)',
        }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Internal grid continuity through the glowing orb */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '56px 56px',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />

        {/* Inner animated pulse glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-white/5 animate-pulse pointer-events-none" />

        {/* Developer Avatar Figure */}
        <motion.div
          className="text-7xl sm:text-8xl md:text-9xl select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] z-20"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          role="img"
          aria-label="Developer Avatar"
        >
          👨‍💻
        </motion.div>
      </motion.div>
    </div>
  );
};

